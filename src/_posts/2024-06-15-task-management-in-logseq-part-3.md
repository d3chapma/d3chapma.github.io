---
layout: post
title: "Task Management in Logseq: Part 3"
---

The next step in building the ideal task management solution in
Logseq is to add lists that can show tasks marked as `LATER`. I like
to have these tasks divided into different categories such as "home",
"work", "writing", etc... The groups help me focus on what type of
task I need at the time. Let's take a look at how we would add a filter
for a category to our query from
<%= link_to "last time", "_posts/2024-06-12-task-management-in-logseq-part-2.md" %>.

## The Query

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

Here is the original query. Again, we are grabbing all blocks with a marker that is
equal to "NOW" or "DOING". We remove any superfluous content around the tasks with the
`:result-transform` and `:breadbrumb-show?` clauses. The next step is quite simple.

```clojure
{
  :title            "WORK"
  :query            [
                      :find (pull ?b [*])
                      :where
                        [?b :block/marker ?m]
                        [(contains? #{"LATER", "TODO"} ?m)]
                        (page-ref ?b "work")
                    ]
  :result-transform (fn [result] ( result))
  :breadcrumb-show? false
  :collapsed?       true
}
```

In this query,

1. We want tasks marked with "LATER" so we change the `contains?` condition to
look for "LATER" and "TODO" rather than "NOW" and "DOING".
2. We add another condition to the `:where` clause that filters to only
blocks on the page "work".
3. We change the `:title` of the query to reflect the new results.
4. We add a `collapsed?` clause that defaults the list to be collapse. This way if
we have a bunch of tasks for later, we don't clutter the journal page with tasks that
we don't typically need to see.

Now we create a new task on a journal page: `LATER Here is a work task #work`.
This gives use a new list on today's journal page that looks like this when it
is expanded:

![Queries: Step 4](/images/logseq-query-step-4.png)

Of course, you can add as many of these queries as you'd like for whatever categories
you can think of.

## Next Steps

<%= link_to "Next", "_posts/2024-06-20-task-management-in-logseq-part-4.md" %>
we will look at scheduled tasks and how we can effectively snooze a task to
make it hidden until a specific date passes.
