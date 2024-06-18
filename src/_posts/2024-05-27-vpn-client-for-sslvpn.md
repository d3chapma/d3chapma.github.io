---
layout: post
title:  "VPN Client for SSLVPN"
---

My workplace has a VPN available for working from home and recommends
using Fortinet VPN client. From my experience, there are a few things
that make Fortinet a less-than-ideal experience. So I went looking for
an alternative.

## What's wrong with Fortinet VPN client?

There are two things that I found frustrating with the Fortinet VPN client.

1. It has no way to save your credentials or integrate with a
password manager, so every time I need the VPN I need to go grab
my username and password.

2. I personally found it to disconnect frequently. It isn't obvious that
is disconnects, so things stop working and it takes a minute to figure
out what's going wrong. Oh yeah, then go grab the credentials again so
I can reconnect...

## What's the alternative?

What I found was [openfortivpn](https://github.com/adrienverge/openfortivpn).

It is easy to install:

```sh
brew install openfortivpn
```

Add you can run it right from the command line:

```sh
sudo openfortivpn $REMOTE_GATEWAY:$PORT "--username=$USERNAME" "--pinentry=pinentry-mac"
```

Pinentry uses keychain to store your credentials.

## Why not use the native VPN client in macOS?

I intially tried to use the native client, but it seems it does not
support SSLVPN.
