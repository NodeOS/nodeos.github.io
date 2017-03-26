---
layout: post
title:  What makes NodeOS better than other traditional operating systems?
date:   2016-01-04T23:33:35Z
author: evanplaice
avatar-url: https://avatars.githubusercontent.com/u/303159?v=3&s=128
comments: 4
github-url: https://github.com/NodeOS/NodeOS/issues/200
---
General purpose operating systems are extremely complex. First they have to provide an extensive HAL (Hardware Abstraction Layer) that can support the wide range of different devices they can be installed on. Second, they need to provide functionality as well as protection for multiple users and many programs/services that support those users.

Web servers require none of that functionality. They generally run off of VMs (Virtual Machines) that abstract away all of the hardware-specific details and they're generally designed for single-purpose usage.

Lets say you decided to build an OS from scratch. Start by stripping everything down to the bare essentials. HAL isn't required because the VM already takes care of abstracting away the hardware. V8 already provides memory/filesystem sandboxing so the separation of user/kernel space (and all of the processing overhead it requires) is no longer necessary.

What you get is an OS that takes up less than 10MB of space, boots up in seconds, requires zero maintenance (other than pushing new updates), requires minimal memory overhead, and runs as fast or faster than the fastest C implementations running on a general purpose OS.

If you've ever used IaaS, you've probably had to deal with the pains of deployment. Deploying a complete general-purpose OS image is a PITA. Docker makes things easier by making it so you only have to deploy your application-specific differences but it adds yet another layer of abstraction, including more complexity and space/memory overhead. Plus, you still have to manage updating the underlying OS for security vulnerabilities and bug fixes.

Here are the layers of abstraction for a Docker deployment:

```
Hardware -> VM -> Kernel Space -> User Space ->  Docker -> V8 VM -> Application
```

And for an application specific system in NodeOS:

```
Hardware -> VM -> Kernel Space -> V8 VM -> Application
```

Fewer layers, means less bloat and drastically reduced surface area for security vulnerabilities.

---

Use case - Building a Load Balancer:
1. clone NodeOS
2. install a load balancer implementation via NPM
3. install additional dependencies to auto-restart, log, profile the system
4. add a custom configuration

Run the build step which packages everything (incl a minimal Linux kernel and Node/V8) as a VM. Then deploy the VM using git or some other deployment tool.

Occasionally, you may need to update dependencies (npm update) and/or modify the config. Run the build step again and it's ready for deployment.

In most setups, the OS lives on the server and changes/updates are either managed remotely via provisioning tools (ex ansible/puppet) or pushed as Docker containers.

In a Unikernel. The setup, dependency management, build process can all be automated using NPM and existing libraries. The builds are small enough that they can be versioned using git.

Theoretically, you could do a whole system setup with 4 commands:
- git clone
- npm run install
- npm run build
- npm run deploy

