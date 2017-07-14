# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Person.create(
    email: "simon@simon-cozens.org",
    password: "ThisIsNotActuallyMyPassword",
    roles: ["admin", "mentor", "leader"],
    name: "Simon Cozens",
    intro_bio: "Simon Cozens is a lecturer at Worldview Center for Intercultural Studies in Australia...",
    preferred_contact: "email",
    affiliations: [
        { organisation: "Worldview Centre for Intercultural Studies",
          position: "Lecturer",
          website: "http://www.worldview.edu.au/"
        },
        { organisation: "WEC International",
          position: "Missionary",
          website: "http://www.wec-international.org/"
        }
    ],
    experience: ["Bible translation", "Buddhism", "Church planting", "Technology"],
    regions: ["East Asia", "Oceania"]
)
