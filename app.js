const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

//Session Creation
const session=require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
  store:new FileStore(),
  secret:"skjghslhgfgflgljglsd",
  resave:false,
  saveUninitialized: false
}));

//Creating routers
const indexRouter = require('./routes/index');

app.use(express.urlencoded({extended:false}));
//app.use(cookieParser());


const sequelize=require('./utils/sequelize.js');
const Coaster = require('./models/Coaster');
const Manufacturer = require('./models/Manufacturer');



app.use('/' , express.static('public'));

//pug stuff
app.set('views',path.join(__dirname, "views"));
app.set('view engine','pug');

//Using routers
app.use('/', indexRouter);


sequelize.authenticate()
.then(()=>{

  sequelize.sync({force:true})
  .then(()=>{
    //RMC Tag Creation
    Manufacturer.create({
      manufacturerName: "Rocky Mountain Construction"
    })
    .then( (manufacturer) =>{
      Coaster.create({"coasterName":"Steel Vengeance","park":"Cedar Point" , "image":"sv.jpg","Description":"Steel Vengeance, formerly known as Mean Streak, is a steel roller coaster at Cedar Point in Sandusky, Ohio. The roller coaster was manufactured by Rocky Mountain Construction (RMC) and opened to the public on May 5, 2018."})
      .then( (coaster) =>{
        manufacturer.addCoaster(coaster)
        .then( () => {
          Coaster.create({"coasterName":"Twisted Colossus", "park":"Six Flags Magic Mountain", "image":"tc.jpg","Description":"Twisted Colossus (formerly Colossus) is a steel roller coaster at Six Flags Magic Mountain amusement park. Originally designed and built by International Amusement Devices, the roller coaster opened as Colossus on June 29, 1978."})
          .then( (coaster) =>{
            manufacturer.addCoaster(coaster)
            .then(() => {
              console.log("Manufacturer: " + manufacturer + " has been added.");
            });
          })
        });
      });
    });

    //Intamin Tag Creation
    Manufacturer.create({
      manufacturerName: "Intamin"
    })
    .then( (manufacturer) =>{
      Coaster.create({"coasterName":"Millenium Force", "park":"Cedar Point" , "image": "mf.jpg","Description":"Millennium Force is a steel roller coaster located at Cedar Point amusement park in Sandusky, Ohio. Manufactured by Intamin, it was the park's fourteenth roller coaster dating back to the opening of Blue Streak in 1964." })
      .then( (coaster) =>{
        manufacturer.addCoaster(coaster)
        .then( () => {
          Coaster.create({"coasterName": "Kingda Ka" , "park": "Six Falgs Discovery Kingdom" , "image": "kk.jpg","Description":"Kingda Ka is a steel accelerator roller coaster located at Six Flags Great Adventure in Jackson, New Jersey. It is the world's tallest roller coaster, the world's second fastest roller coaster, and was the second strata coaster ever built." })
          .then( (coaster) =>{
            manufacturer.addCoaster(coaster)
            .then(() => {
              Coaster.create({"coasterName":"Intimidator 305" , "park": "Kings Dominion" , "image":"i305.jpg","Description":"Intimidator 305 is a steel roller coaster located at Kings Dominion in Doswell, Virginia, United States. Manufactured by Intamin, Intimidator 305 opened to the public on April 2, 2010, as the park's fourteenth roller coaster." })
            })
              .then((coaster)=>{
                manufacturer.addCoaster(coaster)
                .then(()=>{
                    Coaster.create({"coasterName": "Superman: The Ride" , "park": "Six Flags New England" , "image": "superman.jpg","Description":"Superman – Ride of Steel is a steel roller coaster located at Six Flags New England amusement park near Agawam, Massachusetts. Ride of Steel is an identical but mirrored model located at Six Flags Darien Lake amusement park in Darien, New York." })
                })
                  .then((coaster)=>{
                    manufacturer.addCoaster(coaster)
                    .then(()=>{
                      Coaster.create({"coasterName": "El Toro" , "park": "Six Flags Great Adventure" , "image": "et.jpg","Description":"El Toro, a Spanish term meaning The Bull, is a wooden roller coaster at Six Flags Great Adventure in Jackson, New Jersey. Designed by Intamin of Switzerland, it opened to the public on June 11, 2006." })
                      .then((coaster) =>{
                        manufacturer.addCoaster(coaster)
                        .then(()=>{
                          console.log("tag added");
                        })
                      })
                    })
                  })
              })
          })
        });
      });
    });

    //B&M Tag Creation
    Manufacturer.create({
      manufacturerName: "Bolliger and Mabillard"
    })
    .then( (manufacturer) => {
      Coaster.create({"coasterName":"Fury 325" , "park":"Carowinds", "image":"fury.jpg","Description":"Fury 325 is a steel roller coaster located at Carowinds amusement park in Charlotte, North Carolina. Manufactured by Bolliger & Mabillard, it features a 6,602-foot-long (2,012 m) track that reaches a maximum height of 325 feet (99 m)." })
      .then((coaster) =>{
        manufacturer.addCoaster(coaster)
        .then(()=>{
          console.log("tag added");
        })
      })
    });

    //Morgan Tag Creation
    Manufacturer.create({
      manufacturerName: "Morgan"
    })
    .then( (manufacturer) => {
      Coaster.create({"coasterName": "Phantom's Revenge" , "park": "Kennywood" , "manufacturer": "Morgan" , "image": "pr.jpg","Description":"Phantom's Revenge (formerly known as Steel Phantom) is a steel roller coaster at Kennywood. When it opened in 1991, Phantom's Revenge featured the longest drop of any roller coaster in the world and was also the fastest." })
      .then((coaster) =>{
        manufacturer.addCoaster(coaster)
        .then(()=>{
          console.log("tag added");
        })
      })
    });

    //Mack Rides Tag Creation
    Manufacturer.create({
      manufacturerName: "Mack Rides"
    })
    .then( (manufacturer) => {
      Coaster.create({"coasterName":"Time Traveler", "park":"Silver Dollar City", "image": "tt.jpg","Description":"Time Traveler is a steel spinning roller coaster located at the Silver Dollar City theme park in Branson, Missouri, United States. Manufactured by Mack Rides, the roller coaster became the first new roller coaster added since Outlaw Run opened in 2013." })
      .then((coaster) =>{
        manufacturer.addCoaster(coaster)
        .then(()=>{
          console.log("tag added");
        })
      })
    });

    console.log("Successfully Synced");
  })
  .catch((err)=>{
    console.log("Sync Unscucessful", err);
  });

  console.log("Sucessfully Authenticated");
  app.listen(port);
})
.catch((err)=>{
  console.log("could not authenticate",err);
});
