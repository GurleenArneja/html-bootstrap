<<<<<<< HEAD
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/wily64"
  config.vm.box_url = "http://172.23.238.253/vagrant/boxes/wily64v1.box"
  config.vm.network "forwarded_port", guest: 8080, host: 9090
  config.vm.provision :puppet
  config.vm.provision "shell", inline: 'npm set registry http://172.23.238.253:4873/ -g'
end
=======
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "stackroute/html"
  config.vm.box_url = "http://172.23.238.253/vagrant/boxes/stackroute-html.box"

  # Map the guest os port 8080 to host os port 8080
  config.vm.network "forwarded_port", guest: 8080, host: 8080

end
>>>>>>> 3531bcbd7eda54dfc7102d5bc0f1b79c21fd67ee
