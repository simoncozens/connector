gem 'faker'
require 'csv'
require 'base64'
@generator = Namey::Generator.new

csv_text = File.read("db/imdb1.csv")
csv = CSV.parse(csv_text, :headers => false)
mfaces = []
ffaces = []

csv.each do |row|
  if row[0].to_i == 1
    mfaces << row[1]
  else
    ffaces << row[1]
  end
end

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
  gender = Faker::Boolean.boolean
  pic_url = gender ? mfaces.sample : ffaces.sample
  pic = File.read("db/faces/"+pic_url)

  f = Person.create(
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    roles: ["admin", "mentor", "leader"],
    name: gender ? @generator.male(:all) : @generator.female(:all),
    gender: gender ? "Male" : "Female",
    picture: "data:image/jpeg;base64,"+Base64.strict_encode64(pic),
    intro_bio: Faker::Lorem.sentence,
    preferred_contact: contact.sample,
    country: Faker::Address.country,
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
