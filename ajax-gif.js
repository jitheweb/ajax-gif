var topics = [
  "Troy",
  "Us",
  "Italian Job",
  "007",
  "X-man",
  "The Wolf of Wall Street",
  "Herry Porter",
  "the Lord of the ring",
  "Mission Impossible",
  "The Bourne Identity",
  "Gladiator",
  "Rush Hour 1",
  "The Terminal",
  "Captian Marvel",
  "Iron Man",
  "Captian America",
  "Hang over"
];
var numberOfGIFs = 10;

function renderButtons() {
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn");
    newButton.addClass("movie-button");
    newButton.text(topics[i]);
    $("#button-container").append(newButton);
  }
  $(".moive-button").unbind("click");

  $(".movie-button").on("click", function() {
    $(".gif-image").unbind("click");
    $("#gif-container").empty();
    $("#gif-container").removeClass("dotted-border");
    populateGIFContainer($(this).text());
  });
}

function addButton(movie) {
  if (topics.indexOf(movie) === -1) {
    topics.push(movie);
    $("#button-container").empty();
    renderButtons();
  }
}

function populateGIFContainer(movie) {
  $.ajax({
    url:
      "https://api.giphy.com/v1/gifs/search?q=" +
      movie +
      "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" +
      "&limit=" +
      numberOfGIFs,
    method: "GET"
  }).then(function(response) {
    response.data.forEach(function(element) {
      newDiv = $("<div>");
      newDiv.addClass("individual-gif-container");
      newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
      var newImage = $(
        "<img src = '" + element.images.fixed_height_still.url + "'>"
      );
      newImage.addClass("gif-image");
      newImage.attr("state", "still");
      newImage.attr("still-data", element.images.fixed_height_still.url);
      newImage.attr("animated-data", element.images.fixed_height.url);
      newDiv.append(newImage);
      $("#gif-container").append(newDiv);
    });

    $("#gif-container").addClass("dotted-border");
    $(".gif-image").unbind("click");
    $(".gif-image").on("click", function() {
      if ($(this).attr("state") === "still") {
        $(this).attr("state", "animated");
        $(this).attr("src", $(this).attr("animated-data"));
      } else {
        $(this).attr("state", "still");
        $(this).attr("src", $(this).attr("still-data"));
      }
    });
  });
}

$(document).ready(function() {
  renderButtons();
  $("#submit").on("click", function() {
    event.preventDefault();
    addButton(
      $("#movie-show")
        .val()
        .trim()
    );
    $("#movie-show").val("");
  });
});
