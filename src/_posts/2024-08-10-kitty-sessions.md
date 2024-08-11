---
layout: post
title: "Kitty Sessions"
tags: ["kitty"]
---

[Kitty](https://sw.kovidgoyal.net/kitty/) is my terminal emulator of choice right now. Before that
it was [Warp](https://www.warp.dev/) and before that, [iTerm2](https://iterm2.com/).

I have many different products that I maintain in my day-to-day and it is very convenient to be able to
quickly open an environment that has everything I need. For example, when I work on
[D3M](https://www.d3mnetworks.com/) I want:

- One tab open in my local git repo
- Another tab open with multiple kitty windows:
  - Rails server
  - Sidekiq
  - Redis
  - Webpack
- Launch [Zed](https://zed.dev/) with the repo as the active project
- Ensure I'm running the right version of postgres
- Start the elasticsearch container in docker

That is a lot of stuff to start and need running to be ready to begin working.

Warp had something called
[Launch Configurations](https://docs.warp.dev/features/sessions/launch-configurations)
to help with this, which allows you to use YAML to define a Launch Configuration that, when envoked,
will open multiple tabs and run specified commands in each tab. iTerm2 also has an equivalent
feature for this. Here is how to do it in Kitty.

# Kitty Startup Sessions

[Startup Session Documentation](https://sw.kovidgoyal.net/kitty/overview/#startup-sessions)

Here is an abbreviated version of my D3M startup session:

```
new_tab Terminal
cd <PATH_TO_PROJECT>
launch --hold --title "D3M" zed .

new_tab Server
layout fat
cd <PATH_TO_PROJECT>
launch --title "D3M" --hold bin/rails s
launch --hold bundle exec sidekiq
launch docker start dde51da5de7bb4a1f3c0ad83b1d43634d776b6b0563d3b5c28b876967c1253bc
```

This gets saved in a file somewhere. Could be your `~/.config/kitty` folder. And you launch it
by running this command in your terminal:

```shell
open -a kitty.app -n --args --session ~/.config/kitty/d3m --single-instance
```

Note, that the `--single-instance` option is use to make sure the new OS window that is created
is part of the same Kitty instance. If you do not provide this option then when the new window
opens you will not be able to get back to the old window using ```Tab+` ```.

# Explaining the Example Startup Session

So what is everything in that startup session doing? Let's take a look.

`new_tab Terminal` creates a new tab named "Terminal"

`cd <PATH_TO_PROJECT>` sets the current working direction of the tab to the path.

`launch --hold --title "D3M" zed .` creates a new kitty window in the tab and launches `zed .`.
`--title` defines that the OS Window should show "D3M" as the title when that tab is active.
`--hold` prevents the kitty window from closing with the `zed .` command returns control to the terminal.

`layout fat` sets the layout for the current tab. You can check out the
[Layout documentation](https://sw.kovidgoyal.net/kitty/overview/#layouts) for more info.

`launch docker start dde51da5de7bb4a1f3c0ad83b1d43634d776b6b0563d3b5c28b876967c1253bc` runs the specified
docker container and because I didn't provide the `--hold` option, the kitty window is closed immediately
after.

Hope that's enough to set up some of your own Startup Session so you can easily switch between projects
as well.
