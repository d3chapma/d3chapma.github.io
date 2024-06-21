---
layout: post
title: "Task Management in Logseq: Part 2"
---

As I outlined in my
<%= link_to "previous post", "_posts/2024-06-11-task-management-in-logseq.md" %>,
[Logseq](https://logseq.com/) has a great foundation for managing
tasks. However, with a bit of tweaking it can become one of the best
task management systems out there, partially attributed to being able to
easily connect your tasks with relevant notes. Where we left off was
with being able to create tasks and see all the tasks in your graph on
the `NOW` and `LATER` pages. I think it is much better to have your tasks marked
"NOW" right on your journal page, so lets tackle that.

## Logseq Queries

Logseq has a great way to bring together a dynamic list of blocks from
throughout your graph using something called queries. Let's take a look
at a simple one and if you have some tasks in Logseq you can follow along.

```clojure
{
  :title            "NOW" ;; Title of the query
  :query            [
                      :find (pull ?b [*]) ;; Grab each block in graph as ?b
                      :where ;; This is required. Logseq will not output query without a filter
                        [?b :block/marker ?m] ;; Grab each block's marker as ?m
                        [(contains? #{"NOW", "DOING"} ?m)] ;; Filter to only "NOW" and "DOING" tasks
                    ]
}
```

![Queries: Step 1](/images/logseq-query-step-1.png)

If you drop the above code into a block on a page, you'll notice that
when you unfocus the block you get a list titled "NOW" with the children
being all the `NOW` tasks in your graph. However, we don't want
each task to be wrapped in a page container. Let's fix that:

```clojure
{
  :title            "NOW"
  :query            [
                      :find (pull ?b [*])
                      :where
                        [?b :block/marker ?m]
                        [(contains? #{"NOW", "DOING"} ?m)]
                    ]
  :result-transform (fn [result] ( result))
}
```

`result-transform` allows you to transform the result of each item
that the query outputs. Here we just reduce it to it's result and we get this:

![Queries: Step 2](/images/logseq-query-step-2.png)

Much better! But see that "Parent to task". That happens for tasks that are
not top level blocks on a page. Let's fix that too.

```clojure
{
  :title            "NOW"
  :query            [
                      :find (pull ?b [*])
                      :where
                        [?b :block/marker ?m]
                        [(contains? #{"NOW", "DOING"} ?m)]
                    ]
  :result-transform (fn [result] ( result))
  :breadcrumb-show? false
}
```

`:breadcrumb-show?` allows you to toggle whether you want to see
the parents of each result or not.

![Queries: Step 3](/images/logseq-query-step-3.png)

Perfect! You can interact with the list and if you complete a task or click `NOW` to change it to `LATER` you'll notice that it leaves the list. This is great! As I mentioned previously, I use `NOW` to mark tasks that I want to get done today. They are my highest priority items. So they are often all I want to see. But, how do we get this to be on today's journal page?

## Default Queries

You can configure Logseq by going to "Settings" using the ellipsis in the
top right corner of the window. Then click "Edit config.edn". This
shows you a long configuration file with lots of settings you can tweak
to customize Logseq just how you like it. I mentioned in the last post
about the `preferred-workflow` setting. I have it set to `:now`, but
you can also set it to `:todo` to use visually different, but functionally
equivalent markers for your tasks.

What we are interested in right now though is the `:default-queries` setting.
If you scroll down, it should be just past line 200. You may already have
some default queries here. I have a default "NOW" and "NEXT" query. The
problem is, these queries are very tied to the Journals pages and the date
of the journal page they are on. For example, if I put a task on
page that isn't a journal it will not show in the default query. Or, if
I put a task on today's journal and don't complete it within two weeks,
it disappears off the "NOW" list! I don't know about you, but that doesn't
work for me. I need all my "NOW" tasks to show in the list. Luckily,
our much simpler query from above does just that. It doesn't care where
in our graph it is, if it is an uncomplete "NOW" task, it will show in
the list. So, what we can do is just take the query from above without
the `#+BEGIN_QUERY` and `#+END_QUERY` lines and drop it into our default
queries in the config. Now jump back to Logseq and see our "NOW" list
showing all of the `NOW` tasks in our graph.

## Custom CSS

One last minor tweak. Right now the default queries show at the bottom
of today's journal page. I prefer them to show at the top. We can easily
change that too. Jump back to your Settings, but instead of
"Edit config.edn" click "Edit custom.css". Drop this into the editor:

```css
#today-queries {
    order: -1;
    margin-bottom: 2.5rem;
}

.journal.page, .is-journals {
    display: flex;
    flex-direction: column;
}
```

Jump back to today's journal and see that our tasks are now at the top
above the date.

## Next Steps

That is a great step forward, but I like to also have my `LATER` tasks
in a collapsed list below the tasks for today. That way when I need to
grab some new tasks, finding some is easy. That's what we will tackle
<%= link_to "next", "_posts/2024-06-15-task-management-in-logseq-part-3.md" %>.
