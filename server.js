// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");

//require the where function
var where = require("./utils/where");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));

  // from index.ejs: <script src="/static/js/app.js"></script>
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

// ROUTES //
app.get("/", function (req, res){
  // render index.html and send with foods data filled in
  res.render('index', {foods: foods});
});

// api route to get all foods
app.get("/api/foods", function (req, res){
  // send foods data as JSON
  res.json(foods);
});

// create a new food object
app.post('/api/foods', function(req, res){
  console.log(req.body);
  // create a new food object
  var newFood = {};
  // for (var j=0; j < foods.length; j++){
  //  newFood.id = foods.length;
  // }
  // add an id
  // loop through array, find max number, and add one
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
  } else { // foods array is empty
    newFood.id = 0;
  }
  newFood.name = req.body.name;
  newFood.yumminess = req.body.yumminess;
  // add our new food object to the foods array
  foods.push(newFood);
  res.json(newFood);
});

// delete a food item
app.delete('/api/foods/:id', function(req, res){
  var targetId = parseInt(req.params.id);
  // find item in the array matching the id
  var targetItem = where(foods, {id: targetId});
  // get the index of the found item
  var index = foods.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  foods.splice(index, 1);
  // send back deleted object
  res.json(targetItem);
});







app.listen(3000, function (){
  console.log("listening on port 3000");
});