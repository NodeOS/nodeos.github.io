---
layout: docs
---

# Building From Source

## Step 1: Prerequisites

- **Git**. To install using:

  - for **Debian/Ubuntu**: `apt-get install git`
  - for **Arch**: `pacman -S git`

- Node 6.x
- NPM 3.x

After you installed the prerequisites just clone the repository

```bash
$ git clone https://github.com/NodeOS/NodeOS.git
```

## Step 2 (Debian/Ubuntu): Dependencies

Once you've installed the prerequisites you need the dependencies for
Debian/Ubuntu using `apt-get`. First you need to update your cache.
To do so run

```bash
$ dpkg --add-architecture i386
$ apt-get -qq -y update
```

Then you install the dependencies listed below

- cross compiler dependencies: `apt-get -qq -y gcc g++ realpath texinfo`
- barebones dependencies: `apt-get -qq -y bc libpixman-1-dev`
- bootfs dependencies: `apt-get -qq -y genisoimage libuuid:i386`
- initramfs dependencies: `apt-get -qq -y cpio`
- userfs dependencies: `apt-get -qq -y autoconf automake`
- qemu dependencies: `apt-get -qq -y libsdl1.2-dev`

Or as a one liner:

```bash
$ apt-get -qq -y gcc g++ realpath texinfo bc libpixman-1-dev genisoimagelibuuid:i386 cpio autoconf automake libsdl1.2-dev
```

Or just run if you're outside the folder

```bash
$ cd NodeOS/
$ bin/install-dependencies
```

## Step 2 (Arch Linux): Dependencies

Once you have installed the prerequisites you
need the dependencies for Arch Linux

- cross compiler dependencies: `pacman -S gcc texinfo python2`
- barebones dependencies: `pacman -S bc pixman lib32-pixman`
- bootfs dependencies: `pacman -S cdrkit`
- initramfs dependencies: `pacman -S cpio`
- userfs dependencies: `pacman -S autoconf automake`
- qemu dependencies: `pacman -S sdl`

**_Note: The initramfs dependencies are not shipped with the installation of
Arch Linux thats why we need to install them on Arch Linux_**

Or as one liner:

```bash
$ pacman -S gcc texinfo python2 bc pixman lib32-pixman cdrkit cpio autoconf automake sdl
```

## Step 3: Installation

Once you've installed the correct dependencies for your operating system you
can start with the installation of NodeOS.

**_Note: If you have Arch Linux you need to set python2 as default binary when
you run `python`. Because the standard python binary is python3 and nodegyp
doesn't uses it._** To do this, run following commands:

```bash
$ cd /usr/bin
$ ln -sf python2 python
```

The next step is to install the npm dependencies and the bundled dependencies to
do this run following command:

```bash
$ npm install
```

## Step 4: Build NodeOS

We've installed all neccassary dependencies and prerequisites, the next thing
we need to do is to build the whole thing, to do so just run:

```bash
$ npm run build
```

if you want to build NodeOS for Docker run the following commands:

```bash
$ PLATFORM=docker npm run build
$ npm run dockerBuild
```
**_WARNING: If you try to start the generated docker image you'll get a error on
the current version (1.0.0-RC3) of NodeOS that /bin/exclfs cant be found
for more Information check out Issue [#326](../issues/326)_**

then precede with **Step 5**

## Step 5: Run your fresh NodeOS build

Now you can run your fresh build with:

For QEmu:
```bash
$ npm start
```

For Docker:
```bash
$ npm run docker
```

If NodeOS boot without a error, then everything was compiled correctly.
**If not look under [[Troubleshooting]]**

After NodeOS has booted up you should see something like:

```
Hello! I'm a user init script :-)
```

Now you're prompted to enter your username and password. By default, the
username and password is `nodeos` and cannot be changed without altering code.

```
$ username: nodeos
$ password: nodeos
```

**Note: This is not permanent on later versions this will be changed**
