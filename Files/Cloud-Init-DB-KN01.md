```
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
    ssh_pwauth: false
    disable_root: false
    package_update: true
    packages:
- unzip
- gnupg
- curl
  write_files:
- path: /home/ubuntu/mongodconfupdate.sh
  content: >
  sudo sed -i 's/#security:/security:\n  authorization: enabled/g'
  /etc/mongod.conf
- path: /home/ubuntu/mongodbuser.txt
  content: |
  use admin;
  db.createUser(
  {
  user: "admin",
  pwd: "Max",
  roles: [
  { role: "userAdminAnyDatabase", db: "admin" },
  { role: "readWriteAnyDatabase", db: "admin" }
  ]
  }
  );
  runcmd:
- curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o
  /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
- echo "deb [ arch=amd64,arm64
  signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ]
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo
  tee /etc/apt/sources.list.d/mongodb-org-6.0.list
- sudo apt-get update -y
- sudo apt-get install -y mongodb-org
- sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf
- sudo chmod +x /home/ubuntu/mongodconfupdate.sh
- sudo /home/ubuntu/mongodconfupdate.sh
- sudo systemctl enable mongod
- sudo systemctl start mongod
- sudo sleep 3
- sudo mongosh < /home/ubuntu/mongodbuser.txt
- sudo systemctl restart mongod