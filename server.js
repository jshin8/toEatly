// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
];

app.get('/', function(req,res){
  res.render('index', {foods: foods});
});

// app.post('/api/foods', function(req,res){
//   var newFood = {};
//    //we need the newFood object to have id attribute(unique), name attribute, yumminess attribute
//   for(var j=0;j<foods.length;j++){
//   newFood.id=foods.length;
//   }
 

//   newFood.name=req.body.name;
//   newFood.yumminess=req.body.yumminess;


//   foods.push(newFood); //add to foods array
//   res.json(newFood);
//    //res.render('index', {foods: foods});
// });

app.post('/api/foods', function(req,res){
  console.log(req.body);
  var newFood = {};
   
  if (foods.length > 0) {
    var maxId = foods[0].id;
    for (var j=0; j<foods.length; j++){
      if ( foods[j].id > maxId){
        maxId = foods[j].id;
      }
     // maxId = Math.max(foods[j-1].id, foods[j].id); (works only if list is in order, smallest to greatest)
    }
   // now maxId is highest id in array
        newFood.id = maxId + 1;
  }   
  else { // foods array is empty
        newFood.id = 0;
  }


  newFood.name=req.body.name;
  newFood.yumminess=req.body.yumminess;

  foods.push(newFood);
  res.json(newFood);
 
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});