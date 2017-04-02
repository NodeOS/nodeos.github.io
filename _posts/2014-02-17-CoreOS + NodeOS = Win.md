---
layout: post
title:  CoreOS + NodeOS = Win
date:   2014-02-18T06:24:38Z
author: groundwater
avatar-url: https://avatars.githubusercontent.com/u/538488?v=3&s=128
comments: 16
github-url: https://github.com/NodeOS/NodeOS/issues/17
---
I've had a number of people who've tried to run node-os, but run into problems deploying docker. See NodeOS/NodeOS-Docker#5

I'm exploring using CoreOS as the base system.
1. it comes with docker
2. it's lightweight
3. it has a one-step vagrantbox ready to go 
   - https://coreos.com/blog/coreos-vagrant-images/

Assuming you have Vagrant installed, you can get node-os running with

``` bash
$ git clone https://github.com/coreos/coreos-vagrant/
$ cd coreos-vagrant
$ vagrant up
$ vagrant ssh
core $ docker run nodeos/nodeos
```
- @jtenner this should side-step all those ubuntu/docker pains.

I haven't really explored CoreOS much yet, but it looks promising. Basically CoreOS treats Docker as its package manager, which is pretty sweet. I think these two compliment each other well. To use _docker-speak_ CoreOS is the lightweight cargo ship, and node-os is the lightweight container.

I'm going to explore this more, and hopefully turn this into a blog post.

