---
layout: post
title: Initial Hacking
category: Technical
---

So I have started building a spike - a mad-dash proof of concept attempt at implementing as much of the brief as I can to see what lessons can be learned from it. This is also helping to get my head around Angular and get used to working with Rails in a new way as an API server. (I'm also building a few views on the Rails side, purely for debugging and testing; the scaffolding will go away when more of the app is built.)

So far I like what I see of Angular. It's a... different way of building web apps than what I'm used to, but when I got server-side pagination working I was squealing with glee: one click here makes a change to a variable and then *magic happens* and new results are on the screen. Very nice.

I feel like the spike will be done when I have broken the back of three big issues:

* Authentication. I'm planning to use JWT for this, with either Devise or Sorcery on the Rails side. I don't really know what I'm doing to integrate the two things; I'm hoping [this](https://www.codementor.io/blackxored/jwt-with-rails-sorcery-angularjs-du107vo5d) gives me enough of a clue. But authentication this needs to happen, and it needs to do stuff like brute-force protection and do it well. So that's a big deal.

* Angular Routing. I have the vaguest notion of how this works, but to go from listing profiles to viewing one profile or editing one's own profile, we're going to need to move beyond a single view. I'm sure it's not hard, but it's a big architectural jump in my head - once that's done we can basically do anything.

* MongoDB searching and filtering. Probably involving full-text search. I've been looking at the MongoDB book and the FTS ought to be fairly easy to do, but I need to understand the aggregation pipeline to get faceting working. I also need a clearer understanding of how I'm going to build queries on the Angular side and send them to Rails.

Those are the challenges for me. When those three things are in place, I think the rest of phase 1 will be a Simple Matter of Programming. Famous last words, of course...