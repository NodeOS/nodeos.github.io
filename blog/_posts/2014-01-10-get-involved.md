---
layout: post 
title: Get Involved
author: Jacob Groundwater <groundwater@gmail.com>
---

I have had a lot of people contact me recently about helping with NodeOS.
I would love for people to get involved;
the main goal of NodeOS is to build an OS that is truly community driven.

I would like to get people involved early,
so this post is addressed to people who want to dive right in.

## Prerequisites

The following demo only works on an Ubuntu 64-bit image because it relies on Docker.
Install the following to your Ubuntu instance:

- [latest docker](http://www.docker.io/gettingstarted/#h_installation)
- [latest node](http://nodejs.org/)

For Mac OSX, the Docker site explains how to run Docker inside a VirtualBox/Vagrant instance.

## Exercise 1

> Run a demo build

Before doing anything else, you should try running the latest alpha.

    sudo docker run -i -t nodeos/nodeos

This should land you into a custom NodeOS build running `nsh`, a very *very* basic shell written in node.
Try out a few commands `ls`, `cat`, `cd`, `pwd`, etc.
Everything running is running under node, and was installed from an npm package.

Press `^D` to exit the shell.

## Exercise 2

> Use `npkg` to install a new utility

From *within* your docker instance,
try installing some new packages with `npkg` e.g.

    npkg install bin-ncurl

The `npkg install` command is similar to `npm install -g`,
except modules are placed into `$HOME/lib/node_modules`.
Installs are always local to the user running `npkg`.

After installing `ncurl` try:

    ncurl google.com

Executables listed in the modules `package.json`
are placed in `$HOME/bin`.
See the [npm documentation](https://npmjs.org/doc/json.html#bin) on how to create packages with executables.

You can install *any* executable stored in *any* `npm` module with `npkg`.
In just a few minutes you can contribute packages to the NodeOS community.
Packages published to `npm` are *immediately* available to *all* NodeOS installs.
If you've never published to `npm` before [sign up](https://npmjs.org/signup)
and [get publishing](https://npmjs.org/doc/publish.html)!

## Exercise 3

> Use Docker to customize your own NodeOS build

Rather than manually install packages every time,
you can use docker to automatically build and share your custom image.
This is exactly how the `nodeos/nodeos` image in the previous exercise was created.

To build your own custom NodeOS image, 
from a clean directory create a `Dockerfile` with the following:

    FROM nodeos/base
    
    # Fill in this line with your own name/email
    MAINTAINER YOUR_NAME <YOUR_EMAIL>
    
    ENV HOME /root
    ENV PATH /root/bin:/usr/bin:/usr/sbin:/bin:/sbin
    
    # Use `init` to boot the system
    ENTRYPOINT ["init"]
    
    # Run `nsh` on boot
    CMD ["nsh"]

This will build an image without any packages, and is not that useful.
Add the following line to the bottom of the `Dockerfile`:

    RUN npkg install bin-nsh

This will install the `nsh` command to your custom image.

Add as many `RUN` lines as you like.
Remember you *only* want to install packages that expose executables like `npm` or `ncurl`.
If you're stuck, take a peek at [an example `Dockerfile`](https://gist.github.com/groundwater/6748863).

When your `Dockerfile` is ready, [build](http://docs.docker.io/en/latest/commandline/command/build/) your custom NodeOS image with:

    sudo docker build -t myos .

If it builds successfully, [run](http://docs.docker.io/en/latest/commandline/command/run/) your custom build:

    sudo docker run -i -t myos


## Exercise 4

> Share your custom NodeOS build

Building custom systems is only half the fun,
share your build using docker.
Sign into the [docker index](https://index.docker.io/).

You need to tag your docker instance with your your docker *username*.

    sudo docker tag myos $USERNAME/nodeos

Once you've tagged the image, push it to the public index.

    sudo docker push $USERNAME/nodeos

Tell people about your custom build:

- post it to the official [Github thread](https://github.com/NodeOS/NodeOS/issues/15)
- tweet [@theNodeOS](https://twitter.com/thenodeos)


## Problems?

Please file an [issue on Github](https://github.com/NodeOS/Docker-NodeOS/issues/new), but be as descriptive as possible.
The better someone else can reproduce your error, the easier and quicker it will be to solve.

## What's Next?

NodeOS is a work in progress.
There are many more features required by an OS before it can go into production.
Installing executables is only a small piece of the puzzle.

There are many more topics to dive into, including:

- starting and stopping services
- serving Node.js apps from NodeOS
- creating and managing users
- GUIs and window managers

Stay tuned!
