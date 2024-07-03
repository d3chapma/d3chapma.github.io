---
layout: post
title: "Task Management in Logseq: Part 5"
tags: ["task-management","logseq"]
---

At this point we have a list of tasks to be completed today as well as various lists of tasks to
do later, and a way to snooze tasks until some time in the future.
The last piece of the task management puzzle for me is being able to add repeating tasks.
My repeating tasks might be a regular home maintenance task, a habit that I'm building,
or even a relationship I want to regularly invest in.

## Creating Repeating Tasks

I like to have all my repeating tasks in a central location since I often will need to find
them and edit them. So I put my repeating tasks on a dedicated page named "Recurring Tasks".
You make a task recurring by making it a scheduled task using `/scheduled` then click
"Add Repeater". Then you provide a value such as `1d` (repeat daily), `3w` (every 3 weeks), or
any variation you like. When you complete a repeating task, the scheduled date will get adjusted
based on the repeater setting. For example, you might have a scheduled date that looks like this:

```
<2021-05-26 Wed 07:00 .+1d>
```

The `.+1d` means that when you click done on the task, the scheduled date will change to be one
day after the current date.

However, you can edit the `.+1d` to get different behaviour. Change it to `+1d` and it will
change the date to one day after the scheduled date instead of the current date.

## Our Queries

You do not need make and changes our existing queries to have repeating tasks show up
in our lists since they are really just scheduled tasks. Completed a repeating task does not
change it's marker of `NOW` or `LATER`, so you can have repeating tasks that immediately come into
your "Now" list or go into their repective "Later" list when their scheduled date arrives.

## That's it!

That concludes the series on Logseq task management. Hopefully, you learned a bit about clojure
datalog syntax and perhaps considered starting to use Logseq for your task management.
