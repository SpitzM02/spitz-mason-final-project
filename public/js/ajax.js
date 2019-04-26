$(document).ready(()=>{
  let a=parseInt($("#a").val());
  let b=parseInt($("#b").val());
  let adultPrice=80;
  let childPrice=10;
  let price= (a*childPrice)+(b*adultPrice);

  console.log("Ajax.js Number of Children: " + a);
  console.log("Ajax.js Number of Adults: " + b);
  console.log("Ajax.js Price Calculated: " + price);

  $('#submit').on('click',(e)=>{
    e.preventDefault();
    $.ajax({
      url:"/quote",
      method:"post",
      data:{
        numKids:a,
        numAdults:b,
        price:price
      }
    })
    .done((data)=>{
        $("#price").text("Your Current Estimated Quote Is: $" +price);
    });

  })



});
