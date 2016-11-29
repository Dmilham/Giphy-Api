$(document).ready(function(){
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'assets/audio/04-Babymetal-Yavai-webedit.ogg');
audioElement.loop = true;

audioElement.play();
	// Audio Controls==============================================================================================================================================
$("#pause").on("click", function(){
  audioElement.pause();
  $("#pause").css('display', 'none');
  $("#play").css('display', 'block');

});

	// Play Button=================================================================================================================================================
$("#play").on("click", function(){
  audioElement.play();

	// Pause Button================================================================================================================================================
$("#pause").css('display', 'block');
$("#play").css('display', 'none');
});
	
	// Initial array of topics
	var topics = ['Cats', 'Funny', 'Safe for Work', 'Trending'];
	// ===============================================================================================================================================
$("#pause").css('display', 'block');



	// displayTopicInfo function now re-renders the HTML to display the appropriate content. 
	function displayTopicInfo(){
		
		var topic = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

		
		
		// Creates AJAX call for the specific topic  
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
	
			$('#topicsView').empty();

			for (var i = 0; i < 11; i++){

			
			// Creates a div to hold the new topic
			var topicDiv = $('<div class="topicDiv">');

			// Retrieves the Rating Data
			var rating = response.data[i].rating;

			// Creates an element to have the rating displayed
			var pOne = $('<p>').text( "Rating: " + rating);

			// Appends the image
			topicDiv.append(image);

			// Displays the rating
			topicDiv.append(pOne);

			// Creates an element to hold the image 
			var image = $('<img class="startImg">').attr("src", response.data[i].images.fixed_height_still.url);
			image.attr("data-still", response.data[i].images.fixed_height_still.url );
			image.attr("data-animate", response.data[i].images.original.url );
			image.attr("data-convert", "still");


			// Puts the entire topic above the previous topics.
			$('#topicsView').prepend(topicDiv);

			}
		});

	}

	// ========================================================

	// Function for displaying topic data 
	function renderButtons(){ 

			
		// Deletes the topics prior to adding new topics.
		$('#buttonsView').empty();



		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++){

			// Then dynamicaly generates buttons for each topic in the array
			
			
		    var a = $('<button>')  // Sets the variable to = the jQuery call for <button> to write th <button<button/> tags
		    a.addClass('topicBtn'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}



	// This function handles events where one button is clicked
	$('#addTopic').on('click', function(){

		// This line of code will grab the input from the textbox
		var topic = $('#topic-input').val().trim();

		// The topic from the textbox is then added to the array
		topics.push(topic);
		
		// The array then runs which handles the processing of the topic array
		renderButtons();
		$('#topic-input').attr("value", "");
		$('#topic-input').val('');
		// This line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
		
	

		
	})

	// ========================================================

	// Generic function for displaying the topicInfo
	$(document).on('click', '.topicBtn', displayTopicInfo);
	$(document).on('click', '.startImg', function(){
		var state = $(this).attr('data-convert');
	            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-convert', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-convert', 'still');
            }

	});

	// ========================================================

	// This calls the renderButtons() function
	renderButtons();

});




