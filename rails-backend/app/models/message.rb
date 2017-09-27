class Message
  include Mongoid::Document
  include Mongoid::Timestamps
  paginates_per 10

  belongs_to :sender, class_name: 'Person'
  belongs_to :recipient, class_name: 'Person'
  field :status
  field :content

  default_scope lambda { order_by(created_at: :desc) }

  scope :from_user, lambda { |user| where(sender: user) }
  scope :to_user, lambda { |user| where(recipient: user) }
  scope :involves, lambda { |user| any_of([from_user(user).selector, to_user(user).selector]) }

  scope :from_to, lambda {|u1, u2| where(sender: u1, recipient: u2) }
  scope :between, lambda {|u1, u2| any_of([from_to(u1,u2).selector, from_to(u2,u1).selector]) }

  def self.inbox_for(user, page=nil)
    id = user.id
    # This piece of madness organises the messages that a given person
    # is involved in and finds the most recent message for each conversation
    # partner. Think Facebook messages list.
    # It uses MongoDB aggregation.
    pipeline = [
        { "$match": { "$or": [ # First gather all the messages I'm involved in
           { sender_id: id },
           { recipient_id: id },
          ] }
        },
        { "$project": { # Then pick out their dates and the other person involved
            created_at: 1,
            incoming: { "$eq": ["$sender_id", id] },
            other_person: {
              "$cond": { if: { "$eq": ["$sender_id", id] },
                then: "$recipient_id",
                else: "$sender_id"
              }
            }
          }
        },
        { "$sort": { created_at: 1 } }, # Sort by date
        { "$group": { # Group by the other person involved
            _id: "$other_person",
            incoming: { "$last": "$incoming" },
            most_recent: { "$last": "$_id" }
          }
        }
    ]
    # It sucks that we have to run this twice, but that's pagination for you
    count = collection.aggregate(pipeline).count
    if page
        pipeline << { '$skip' => ((page.to_i - 1) * default_per_page) }
        pipeline << { '$limit' => default_per_page }
    end
    results = collection.aggregate(pipeline).map {|rec| {
          user: Person.find(rec["_id"]),
          message: Message.find(rec["most_recent"]),
          incoming: rec["incoming"]
      }}
    results.instance_eval <<-EVAL
        def current_page
          #{ page }
        end
        def total_count
          #{ count}
        end
        def total_pages
          #{ count.modulo(default_per_page).zero? ? (count / default_per_page) : ((count / default_per_page) + 1)}
        end
        def limit_value
          #{ default_per_page }
        end
      EVAL
    return results
  end
end
