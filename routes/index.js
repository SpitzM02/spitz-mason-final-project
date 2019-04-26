const express = require('express');
const router = express.Router();
const Coaster = require('../models/Coaster');
const Manufacturer = require('../models/Manufacturer');
//code for the home page
router.get('/',(req,res)=>{

  //Sequelize Implementation
  Coaster.findAll()
  .then((coaster) => {
    console.log(coasters);
    res.render('index', {coaster:coasters});
  })
  .catch((err)=>{console.log("error getting coasters"),err});



  //Session Implementation:
  //Every 10th time or so the user visits the site they will be redirected to the pricequote page
  //Creates Session

  req.session.pageCount = req.session.pageCount+1||0;

  if(req.session.pageCount%10==0)
  {
    req.session.pageCount=1;
    res.redirect("/quote");
  }
  else
  {
    //Sequelize Implementation
    Coaster.findAll()
    .then((coasters) => {
      console.log(coasters);
      res.render('index', {coaster:coasters});
    })
    .catch((err)=>{console.log("error getting coasters"),err});
  }
});

//code for the /coaster/:id page
router.get('/coaster/:id',(req,res)=>{
  let id = parseInt(req.params.id);

  req.session.pageCount = req.session.pageCount+1||0;

  if(req.session.pageCount%10==0)
  {
    req.session.pageCount=1;
    res.redirect("/quote");
  }
  else
  {
    Coaster.findByPk(id)
    .then((coasters) =>{
      res.render('details',{
        /*
        id:id,
        coasterName:coasterName,
        image:image,
        park:park,
        manufacturer:manufacturer
        */
        coaster:coasters
      });
    });
  }
});

//Code for the /quote redirection
router.get('/quote',(req,res)=>{
  res.render('priceQuote');
});

router.post('/quote',(req,res)=>{
  let numChildren = parseInt(req.body.numChildren);
  console.log("Number of Children: " +numChildren);
  let numAdults = parseInt(req.body.numAdults);
  console.log("Number of Adults: " +numAdults);
  let price= parseInt(req.body.price);
  console.log("Price Calculated: " +price);
  res.json({price:price});
});

module.exports= router;
