gem 'faker'
contact =  ["Email","SMS","Phone (Voice)","Skype","Facebook","LinkedIn","Other"]
experience = [
            "Apologetics-Truth-Pluralism",
            "Arts",
            "Bible Translation and Exposition",
            "Buddhism",
            "Business as Mission",
            "Children at Risk",
            "Church Planting",
            "Church Research",
            "Cities",
            "Creation Care",
            "Diasporas",
            "Disability Concerns",
            "Evangelism among Children",
            "Evangelism Training",
            "Health-Healing-Wholeness",
            "Hinduism",
            "Human Sexuality and Gender Identity",
            "Integral Holistic Mission",
            "Integrity and Anti-Corruption",
            "International Student Ministry",
            "Islam",
            "Jewish Evangelism",
            "Leadership Development",
            "Least Evangelized Peoples",
            "Marketplace Ministry",
            "Media Engagement",
            "Mental Health and Counseling in Mission",
            "Orality",
            "Partnership of Men and Women",
            "Proclamation Evangelism",
            "Reconciliation",
            "Resource Mobilization",
            "Science and Emerging Technologies",
            "Slavery-Human Trafficking-Justice",
            "Strategic Evangelistic Partnerships",
            "Study of Global Christianity",
            "Technology",
            "Tentmaking",
            "Theological Education",
            "Women in Evangelism"
          ]
regions = [
             "Africa - English-Spanish-Portuguese Speaking",
             "Africa - French Speaking",
             "Caribbean",
             "East Asia",
             "Eurasia",
             "Europe",
             "Latin America",
             "Middle East / North Africa",
             "North America",
             "South Asia",
             "South Pacific",
             "Southeast Asia",
]
500.times {
  f = Person.create(
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    roles: ["admin", "mentor", "leader"],
    name: Faker::Name.name,
    intro_bio: Faker::Lorem.sentence,
    preferred_contact: contact.sample,
    affiliations: [
        { organisation: Faker::Company.name,
          position: Faker::Company.profession
        },
        { organisation: Faker::Company.name,
          position: Faker::Company.profession
        }
    ],
    experience: experience.sample(rand(1..5)),
    regions: regions.sample(rand(1..2))
  )
  f.save!
}
