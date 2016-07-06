---
layout: post
title: Node Init Daemon
tagline: Rethinking the Init Process
---
{% include JB/setup %}

- OS/Global NPM packages are managed by `npkg`
- Each users `PATH` variable is always `$HOME/bin:/bin`
- `npkg` binaries are installed to `$HOME/bin`
- `npkg` modules are installed to `$HOME/lib/node_modules`

We need a few 

    /bin/     <--- only the boot essentials
      node
      npm
      npkg
    /root/    <--- init stuff
      bin/
        getty
        bash
        init
        nodeos-default
      lib/node_modules/

The init process is different than init daemons like **system.d** or **upstart**.
The init daemon does not read any configuration files;
it only boots a single process initially,
the process given as it's command line argument.

For example, `init -- npkg start default` tells init to call `npkg` with arguments `start default` after starting.

Before init calls its first argument,
it spawns an HTTP server on `127.0.0.1:1`.
Init jobs can be started and stopped via a RESTful API.

The first processe called by init should call inits API and start the rest of the system.