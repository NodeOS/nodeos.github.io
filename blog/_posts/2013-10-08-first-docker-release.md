---
layout: post 
title: First Docker Release
author: Jacob Groundwater <groundwater@gmail.com>
---

I believe that great software comes from iteration,
and a strong pipeline between change and release.
Every change to NodeOS should be testable,
bootable, and sharable as fast as possible.
I don't really have a plan about what I'm designing;
I just have a pipeline and a way to quickly try out new ideas.

I've chosen [Docker](http://docker.io) as the cornerstone of
early NodeOS pipeline.

- Docker simplifies the boot process, you can iterate on the higher level
systems without worrying about bootstrapping the kernel. 
- Docker layers can be cached, making build times shorter
- The [Docker Index](https://index.docker.io) lets me share builds immediately,
easily, and completely.
- Docker lets others build off what I'm working on.


In regards to the final note, you can build a working NodeOS docker image 
with the following `Dockerfile`

	# Dockerfile
	FROM nodeos/nodeos
	 
	MAINTAINER Jacob Groundwater <groundwater@gmail.com>
	 
	ENV HOME /root
	ENV PATH /root/bin:/usr/bin:/usr/sbin:/bin:/sbin
	 
	# Use `init` to boot the system
	ENTRYPOINT ["init"]
	 
	# Run `nsh` on boot
	CMD ["nsh"]
	 
	# Install root command line
	RUN npkg install bin-nsh
	RUN npkg install bin-man
	RUN npkg install bin-ls
	RUN npkg install bin-fs
	RUN npkg install bin-cat
	RUN npkg install bin-pwd

Now you try:

	git clone https://gist.github.com/6757451.git MyNodeOS
	sudo docker build -t MyNodeOS MyNodeOS 
	sudo docker run -t -i MyNodeOS

# Caveats

NodeOS on docker is extremely alpha.
Because of docker, I am able to turn out functional images 
before they're anywhere close to stable or complete.



