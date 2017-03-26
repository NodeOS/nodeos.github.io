---
layout: docs
---

# Using precompiled Binaries

## Why?

We provide prebuild images to...

- ... get you started quickly
- ... speed up your deployment
- ... help you, if you having problems compiling it yourself

## Downloading precompiled Binaries

First you need to go to [Releases](https://github.com/NodeOS/NodeOS/releases).
Then Choose your architecture and your Platform.
You can choose between the `x86_64` and `i386` architecture.
And you can choose between `docker`, `img`, `iso` and `qemu` as Platform.

After you downloaded your specified package you just unzip it and and run it.

For the `img` and `iso` binary you get:

```
bootfs.(img|iso)
run.sh      <-- you need to run this
usersfs.img
```

For `qemu` you get something like this:

```
initramfs.cpio.gz
kernel
README.md
run.sh      <-- you need to run this
usersfs.img
```

And for `docker` its pretty much the same

```
barebones.tar.gz
Dockerfile
initramfs.tar.gz
README.md
run.sh     <-- you need to run this
usersfs.tar.gz
```

**_Note: Currently the generated Docker image cant be started for more
Information take a look at Issue [#326](../issues/326), [#272](../issues/272)
and [#227](../issues/227)_**

Overall its very simple to deploy NodeOS,
if you want to build NodeOS from Source look at [[this|Building From Source]]
