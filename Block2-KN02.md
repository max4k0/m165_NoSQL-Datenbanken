A:


[app.js](Files/js_files/metric.js)




B:
````

#cloud-config
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    home: /home/ubuntu
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa
        AAAAB3NzaC1yc2EAAAADAQABAAABAQDiFF0IevVrnztLwZXbnq86xovqqQK5LCgeeoZsQapdaWAqDjIDtFUCRaTA1mr4Mj1JvBk+brioDjI5RuV5Ym0mbBtsswXPEJFiLUpp+1knCSldYlZuQXjkpZKBh1Ib8vb3QPuWxcK5eJeXRkjex92l3x4ntuezS3lvMRjHhyshYkd2VweTvMfgw/6SUt2xX5aiHA+oJ5fWySaSiOt2NgfXw/o9iodOACYu+lO3FS7UMapgis7fGbTa36P4pcGDvRkgx3ysXUXFdfkomaayc10PxYE3fhg03ANpvwF1GmRvpicMNj5YKHQY5z/334Er0OSOsC7Pu1i1euF6aq1RE7lj
        Max-aws-key
      - ssh-rsa
        AAAAB3NzaC1yc2EAAAADAQABAAABAQCPIIO8uY8oWIihDv0tCAbX6toyG1RYkaLZyfGD1L+I07K4CnwAVBSU+81vw3Yv5sN9tj2Ccve9kzEeCNMld2mDP/Tt7edkx2MCToVfVx+njqwY/XbMY9bfdRKJLhIoLavuVNLnnkSIXdtlGr3JF71hPHzBDMEo64ofPCQ8hPsGxL1u3efb12jcWcRhudKtv7Qh6cVE47Zj4xImfi6VlLqwzcKZ5oCqR/z1hLLL+/pS3eM5Qsor5wmAqNfH4+z5eE+pOkFm7a0Nkygv9jwXIqtJzFGKYDe6ciBD04pEovdvY0FTyiv2vksQOVgjtu2faG2Iv1HOG0JktCIwJ49OEgjT
        teacher-key
ssh_pwauth: true
disable_root: false
package_update: true
packages:
  - apt-transport-https
  - wget
  - nodejs
  - npm
  - prometheus
  - prometheus-node-exporter
write_files:
  - path: /etc/prometheus/prometheus.yml
    permissions: "0644"
    content: |
      global:
        scrape_interval: 15s
      scrape_configs:
        - job_name: prometheus
          static_configs:
            - targets: ['localhost:9090']
        - job_name: node
          static_configs:
            - targets: ['localhost:9100']
        - job_name: random_number
          static_configs:
            - targets: ['localhost:5000']
      rule_files:
        - "/etc/prometheus/rules.yml"

  - path: /etc/prometheus/rules.yml
    permissions: "0644"
    content: |
      groups:
        - name: custom_rules
          rules:
            - record: node_memory_MemFree_percent
              expr: 100 - (100 * node_memory_MemFree_bytes / node_memory_MemTotal_bytes)
            - record: node_filesystem_free_percent
              expr: 100 * node_filesystem_free_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}

        - name: alert_rules
          rules:
            - alert: InstanceDown
              expr: up == 0
              for: 1m
              labels:
                severity: critical
              annotations:
                summary: "Instance {{ $labels.instance }} down"
                description: "Instance {{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute."

  - path: /home/ubuntu/metric.js
    permissions: "0755"
    content: |
      const express = require('express');
      const metric = express();
      const port = 3521;

      metric.get('/metrics', (req, res) => {
        const randomMetric = Math.floor(Math.random()*100);
        res.json({ metric: randomMetric });
      });

      metric.listen(port, '0.0.0.0', () => {
        console.log(`api: http://localhost:${port}`);
      });


  - path: /etc/systemd/system/flask-app.service
    permissions: "0644"
    content: |
      [Unit]
      Description=Flask App for Prometheus Metrics
      After=network.target

      [Service]
      User=ubuntu
      WorkingDirectory=/home/ubuntu
      ExecStart=node home/ubuntu/metric.js
      Restart=always

      [Install]
      WantedBy=multi-user.target

  - path: /etc/grafana/provisioning/datasources/prometheus.yaml
    permissions: "0644"
    content: |
      apiVersion: 1
      datasources:
        - name: Prometheus
          type: prometheus
          access: proxy
          url: http://localhost:9090
          isDefault: true
          version: 1

runcmd:
  - pip install flask prometheus_client
  - sudo systemctl enable flask-app.service
  - sudo systemctl start flask-app.service

  - sudo systemctl enable prometheus.service
  - sudo systemctl start prometheus.service
  - sudo systemctl enable prometheus-node-exporter.service
  - sudo systemctl start prometheus-node-exporter.service
  - sudo systemctl restart prometheus
  - sudo mkdir -p /etc/apt/keyrings/
  - wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
  - echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
  - sudo apt-get update -y
  - sudo apt-get install grafana-enterprise -y
  - sudo systemctl daemon-reload
  - sudo systemctl start grafana-server
  - sudo systemctl enable grafana-server.service
  - sudo systemctl restart grafana-server
  - cd /home/ubuntu
  - npm init -y
  - npm install express
  - node /home/ubuntu/metric.js
 