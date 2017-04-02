---
layout: post
title:  <%= title %>
date:   <%= created_at %>
author: <%= user.login %>
avatar-url: <%= user.avatar_url %>&s=128
comments: <%= comments %>
github-url: <%= html_url %>
---
<%= body %>
