// Q1. Define an object containing information about yourself. The object needs to include
//  'name', 'address', 'emails', 'interests' and 'education'. The 'education' key needs to be an
//   array of objects containing keys 'name' and 'enrolledDate'.

myInformation = {
  name: "Bishal Sarangkoti",
  address: "28 Kilo, DHulikhel",
  email: ["sarangbishal@gmail.com", "bishalsarang@gmail.com"]
  interests: ["Programming", "Reading", "Series", "Movies"],
  education: [
    {
      name: "Kathmandu University",
      enrolledDate: "2016-05-13",
    },
    {
      name: "St. Xavier's College, Maitighar",
      enrolledDate: "2014-05-13",
    },
    {
      name: "Reader's Public High Schoole",
      enrolledDate: "2002-05-13",
    },
  ],
};

// Q2. Using the object defined previously iterate over the 'education' key and print a list of output in the console as follows:
// Name: ABC School of Schoolery, Date: 2000
// Name: BCD School of Trickery, Date: 2006

myInformation["education"].forEach(function (institueObj) {
  var institutename = institueObj.name;
  var enrolledDate = institueObj.enrolledDate;
  console.log("Name: " + institutename + ", Date: " + enrolledDate);
});
