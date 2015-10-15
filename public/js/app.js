// CLIENT-SIDE JAVASCRIPT
// toEatly/public/js/app.js
// served with express.static in server.js
// On page load
$(document).ready(function(){
	console.log("I'm super sure this is connected to index");
	$("#new-food-form").on('submit', function(e){
		// prevent default submit behavior
		e.preventDefault();
		// var newFoodData = {};
		// newFoodData.name = $("#name").val();
		// newFoodData.yumminess = $("#yum").val();
		// make an ajax post request to /api/foods with the new food data
		$.ajax({
			type: 'POST',
			url: '/api/foods',
			data: $('#new-food-form').serialize(),
			// data: newFoodData,
			success: function(response){
				console.log("post response: ",response);
				$("#new-food-form")[0].reset();
				// actually add new food to the page
				addFoodToPage(response);
			}
		});
	});
	$(document).on('click', 'button.close', function(e){
		deleteFood(this);
		// make an ajax DELETE request to our new route
		// use the food's id in the url
		// when successful, remove it from the page
	});
});
function addFoodToPage(response){
	// create a new li with the response food data
	var htmlString = "<li class='list-group-item'>\n" + 
          response.name + 
          "<span class='label label-default'>" +
          response.yumminess + "</span>" +
        "</li>";
	// add the li to the page with append
	$("#food-ul").append(htmlString);
}

function deleteFood(context){
	console.log(context);
	var foodId = $(context).data().id;
	$.ajax({
	    url: '/api/foods/' + foodId,
	    type: 'DELETE',
	    success: function(response) {
	      // once successful, remove food from the DOM
	      $(context).closest('li').remove();
    }
  });

}
