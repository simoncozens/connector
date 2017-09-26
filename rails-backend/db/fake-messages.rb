people = Person.limit(10)
500.times { |c|
  Message.create(
    sender: people.sample,
    recipient: people.sample,
    content: "Message "+c.to_s,
    status: ["Read", "Unread"].sample
    )
}