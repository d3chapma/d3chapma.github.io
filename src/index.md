---
# Feel free to add content and custom Front Matter to this file.

layout: default
---


<% collections.posts.resources.each do |post| %>
  <div class="post-item">
    <a href="<%= post.relative_url %>"><%= post.data.title %></a>
    <span class="muted">
      <%= date_to_string post.date, "ordinal", "US" %>
    </span>
  </div>
<% end %>
