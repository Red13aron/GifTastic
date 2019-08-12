// Initial array of movies
// Url: https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9
// My API Key: kEWG6NDA4vQsLZ9BV1HLqoWl6UixAgVI
const movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {
  const movie = this.getAttribute("data-name");
  const apiKey = "kEWG6NDA4vQsLZ9BV1HLqoWl6UixAgVI";
  const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=10&apikey=" + apiKey;

  // Creating an fetch call for the specific movie button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (responseJson) {
      // Creating a div to hold the movie
      for (let i = 0; i < responseJson.data.length; i++) {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add('movie');

        // Retrieving the URL for the image
        const imgURL = responseJson.data[i].images.fixed_height_still.url;
        // Creating an element to hold the image
        const image = document.createElement("img")
        image.setAttribute("src", imgURL);

        image.classList.add("data-animate");
        image.setAttribute("data-animate", responseJson.data[i].images.fixed_height.url);

        image.classList.add("data-still");
        image.setAttribute("data-still", responseJson.data[i].images.fixed_height_still.url);

        image.classList.add("data-state");
        image.setAttribute("data-state", "still");

        // Appending the image
        movieDiv.append(image);
        // Storing the rating data
        const rating = responseJson.data[i].rating;

        // Creating an element to have the rating displayed
        const pOne = document.createElement("p")
        pOne.innerHTML = "Rating: " + rating;



        movieDiv.append(pOne);

        // Putting the entire movie above the previous movies
        document.getElementById("movies-view").prepend(movieDiv);
      }
      switchState(); 
    });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  document.getElementById("buttons-view").innerHTML = "";

  // Looping through the array of movies
  for (let i = 0; i < movies.length; i++) {

    // Then dynamically generating buttons for each movie in the array
    const a = document.createElement("button");
    // Adding a class of movie to our button
    a.classList.add("movie");
    // Adding a data-attribute
    a.setAttribute("data-name", movies[i]);
    // Providing the initial button text
    a.innerHTML = movies[i];
    // Adding the button to the buttons-view div
    document.getElementById("buttons-view").append(a);

    // Function for displaying the movie info
    a.addEventListener("click", displayMovieInfo);
  }

}

// This function handles events where one button is clicked
document.getElementById("add-movie").addEventListener("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  const movie = document.getElementById("movie-input").value.trim();
  // Adding the movie from the textbox to our array
  const movieChecker = movies.findIndex(function(currentMovie){
    return currentMovie === movie;
  }, movie);

  if(movie !== "" && movieChecker === -1){
  movies.push(movie);
  console.log(movies);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
  }
  else{
    console.log("Stop trying to break my crap John");
  }
});
// Calling the renderButtons function to display the intial buttons
renderButtons();

function switchState() {
  document.querySelectorAll(".movie").forEach(function (img) {
    img.addEventListener("click", function (event) {

      // The javascript getAttribute method allows us to get or set the value of any attribute on our HTML element
      let state = event.target.getAttribute("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        event.target.setAttribute("src", event.target.getAttribute("data-animate"));
        event.target.setAttribute("data-state", "animate");
      } else {
        event.target.setAttribute("src", event.target.getAttribute("data-still"));
        event.target.setAttribute("data-state", "still");
      }
    });
  });
}
