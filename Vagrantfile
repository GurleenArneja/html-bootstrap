# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/wily64"
  config.vm.box_url = "http://172.23.238.253/vagrant/boxes/wily64v1.box"
  config.vm.network "forwarded_port", guest: 8080, host: 9090
  config.vm.provision :puppet
  config.vm.provision "shell", inline: 'npm set registry http://172.23.238.253:4873/ -g'
end
