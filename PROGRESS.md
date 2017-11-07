# Phase 1 Spike

## Milestone 2 - October 20th

- [x] Offline mode
  - [x] Syncronise server profiles to encrypted database
  - [x] Get profile(s) from local DB, not web
  - [x] Send back changed information (favourites, visits, annotations) to server
  - [x] Implement (basic) searching on mobile
- [ ] Security and visibility level
  - [x] Show a profile from the point of view of the current user
  - [x] Add an interface to edit permissions for individual profile fields
  - [ ] Admin interface to which fields are editable/viewable
  - [ ] Allow admins to edit a user's memberships (gatherings etc.)

## Milestone 3 - October 27th

- [x] Recommended connections
  - [x] Add Elasticsearch backend to database https://github.com/artburkart/mongo-connector-example-setup
    - [x] Create ES index
    - [x] Add ES functionality to Rails
  - [x] Use "More Like This" query to find similar connections
- [ ] Search
  - [x] Basic search
  - [ ] Advanced/field search
  - [ ] Faceting
- [ ] Apply for account
- [ ] Forgotten password (https://github.com/NoamB/sorcery/wiki/Reset-password)
- [ ] CVS/vCard export
  - [ ] Build contact data out of profile
  - [x] Send contact on click
  - [x] Add contact to device's contacts

## Milestone 4 - Nov 17th

- [ ] Salesforce integration
  - [x] Research API integration libraries: https://github.com/restforce/restforce
  - [ ] Understand existing DB structure
  - [ ] Send changes to SF
  - [ ] Receive changes from SF

## Milestone 5 - Dec 1st

- [ ] Localisation
  - [x] User language selection
  - [x] Support for adding translations
  - [ ] Choose and persist user language
  - [ ] Automatic translation for profiles
- [ ] Notifications
  - [x] Set up iOS push notifications infrastructure
  - [ ] Set up Android push notifications infrastructure
  - [ ] Send notification on new mail
  - [ ] Admin interface for sending messages to groups
- [ ] Analytics https://ionicframework.com/docs/native/google-analytics/
- [ ] Security
  - [ ] Phishing detection
  - [x] Account lockout
  - [ ] Unusual IP detection?

## Already Done

- [x] Authentication
- [x] Edit profile
- [x] Starred profiles
- [x] Recently visited
- [x] Messages
- [x] Annotations

## Putting off post first release

- [ ] Offline messages
