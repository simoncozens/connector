---
layout: post
title: Initial Thoughts
category: Technical
---

*First question: Can we leverage existing code?*

When I looked at the initial concept document for Connector 2.0, I assumed that the focus was on communication - messaging, group conversations and so on. Because of that, I looked at existing communication tools, and thought that [Discourse](http://www.discourse.org) would be a good fit.

Now looking at the revised concept and chatting with Atilla and Andrew, I am less convinced by this. Andrew made it very clear that the priority is not online communication but essentially a catalogue of curated profiles, and that the fundamental value of the package would come from the ability to find, filter and facet individual profiles. The primary model is not the message or the group but the person. Rather than looking at forum software, a closer analogue might be online shopping: instead of choosing products by searching and selecting on a database, you're choosing people by search and refining a list of profiles.

While Discourse does support custom profile fields, that's not its core business. It's a forum/messaging/communication tool; it isn't a catalogue. So I feel like starting from Discourse would mean trying to beat it into shape to make it something it isn't. I don't think it's going to give us the flexibility that we want. Similar arguments apply for trying to beat the conference management app into being a profile catalogue - if we want to make sure the fundamentals are good, that we have to start with something that is basically aligned with what we want, and I think that Discourse unfortunately isn't.

And I can't think of anything that is. Regretfully, I feel like we have to start from scratch here.

*So, what technologies, then?*

I think I'm pretty happy with the idea of using Ionic for the app. Settling on an AngularJS solution for the app would suggest to some that we should go with a MEAN stack on the server and have JavaScript end-to-end. There's admittedly some good reasons for that, but at the same time I don't think there will be as much overlap between the app and the server side as one might think (I'll discuss why in a moment) and because of that, I don't think we should let the tail wag the dog. It's worth asking the question: Assuming that we can use JSON for data interchange on both sides, what's the *best* solution for the server given what we want to achieve?

Now *best* is totally subjective, and while we often pretend that language choice happens on purely technical grounds, really, it doesn't. If I wanted to ensure the codebase was open to as wide a variety of developers as possible, I'd write in PHP; that's a social choice, not a technical one. But right now I'm the lead and only developer, and I have to make a choice that's both relatively mainstream that other people can come onboard later, but also that I am sufficiently familiar with to get stuff done quickly and well. So with no disrespect to ExpressJS or anything else, *we're going with Rails as the web framework*. Something that is nice about Rails is that it gives us resource routing that, as I understand it, can be easily consumed by Angular.

Which brings us to Angular. I was initially reticent about this because, let's face it, there's a Hot New JavaScript Framework That Everyone Must Use coming out pretty much every week, and I needed time to be convinced that Angular was the one that was going to win and go mainstream. But it does seem to have done that, and if we're using Ionic on the app side then it does at least create the possibility of sharing code. So we'll do that; this will be a learning experience for me, as I haven't used it before, but what I've seen makes sense. And because it won and went mainstream, it also creates the possibility of picking up other front-end developers to work on this later - or at least not alienating people with weird choices of tech. Once again, these are primarily social choices, not technical ones.

And now here's where I get unsure of myself: what to use for the data store. I'm pretty sure we want a document database, something NoSQL. And I love the idea that people are wodges of JSON that we send from the database to the front-end or to the app to render in Angular. (I'm even thinking we Base64-encode profile pictures and throw them into the document so that everything that the system knows about a person is in one easily-synced bit of JSON, rather than scattered in different files.) Anyway, the document approach makes sense to me.

The fact that we want a very flexible approach to profile fields and allowing people to give us all sorts of different kinds of data about themselves and their journey also pushes me towards the document database approach and away from a SQL database. So one obvious way to go would be MongoDB, and again, MongoDB/Rails is not an unfamiliar stack - they work well together and we can find people with that kind of skillset.

At the same time, one of the fundamental needs is for search, filtering and faceting to work well. Naturally I would be reaching for ElasticSearch here, and this is where the dilemma comes: we could use ES for the document repository and search; we could use MongoDB for both; we could use Mongo for data and ES for search.

Using MongoDB for both means getting Mongo to facet and filter well, which seems to be [a bit of a fight](https://www.mongodb.com/blog/post/faceted-search-with-mongodb). Using ElasticSearch for both makes sense to me, and I've done it before. Because using ES and Mongo together *seems* crazy: two NoSQL document database server in the same app just sounds like too many. You need to replicate exactly the same data in two places, which is generally an architectural no-no. And yet, there's benefit to having search done by something that does search well.

So why use Mongo at all? I think what has swung it for me is that we aren't just dealing with profiles. Down the track we will want to be storing information about messages, groups and so on. We're not going to be searching everything, and Mongo handles data updates and retrievals better than ES does.

I think until convinced otherwise that I am going to follow the YAGNI (You Ain't Gonna Need It) approach here: I'm going to start just by using Mongo, and having the battle with Mongo to make faceted search work. If I can't get that to go as nicely as I want, then I will bring in ElasticSearch alongside it. But I'm not convinced about this approach and open to other suggestions.

*The site and the app will need to be different*

One of the reasons for shying away from ExpressJS - other than the obvious one that I don't know it - is that I'm not convinced that there will be major opportunities for code reuse between the web site and the app, beyond what we get by using Angular on both. This is because of the need for the profile database to be made available offline and stored securely. And also, it's got to be fast and memory efficient, which means I want the data we need to be available on the device.

Now, needless to say, we ain't going to be running Mongo and/or Elasticsearch on our iPhones. One implication of this: we need to have separate online and offline search capabilities, and offline search is going to be much less featureful than online - but even so, it still needs to work.

So how do we store our however-many-thousand JSON profiles securely on the device? We could do one big encrypted JSON file than we decrypt in memory, but that gets yucky very quickly even before you think about how to do a full-text search on it. We could do lots of little encrypted JSON files, and that's just as bad if not more so.

I think the direction I would head in is a simple encrypted SQLite database (see [sqlcipher](https://github.com/litehelpers/Cordova-sqlcipher-adapter)) Within the database, create columns for anything that will get displayed in a list and so needs to be accessed quickly (e.g. full name, profile pic?) and one column for the JSON blob. (I don't think we need one column for last updated date, because we just ask the server for anything changed since the last sync.)

So we need to be using local data instead of remote data (again for speed and memory access); we will need lots of Javascript to marshal access to our SQL-based profile database; and that's why it at least smells to me like the amount of code sharing between server and app is going to be pretty limited. It would be lovely if they could both be based on the same technology, but life is sometimes not lovely.

So, in summary I think we want an Ionic / SQLite app talking to a Rails / Mongo / Angular server. I might be wrong, but at least I've thought about it.
