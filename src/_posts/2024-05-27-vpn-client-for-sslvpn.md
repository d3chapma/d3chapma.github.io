---
layout: post
title:  "VPN Client for SSLVPN"
---

Fortinet Replacement VPN
Native VPN in macOS doesn't support SSLVPN
A common client for this is Fortinet VPN. It is OK but has a few drawbacks.
Frequently disconnects
Need to type in the password every time you connect
A better alternative is [openfortivpn](https://github.com/adrienverge/openfortivpn)
Install with brew `brew install openfortivpn`
Run from command line
`sudo openfortivpn $REMOTE_GATEWAY:$PORT "--username=$USERNAME" "--pinentry=pinentry-mac"`
This will ask for your password and store it in keychain so it doesn't have to ask every time
