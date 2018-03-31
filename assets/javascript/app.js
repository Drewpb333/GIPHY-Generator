$(document).ready(function () {
  // Two issues to work on:
  // *formatting images in rows
  // *allowing buttons to still be used after additonal button added

  var apiKey = "n2x8gbuyg0EvHF3aTgfCDBsL8TEP3Oru";
  var movies = ["Step Brothers", "Talladega Nights", "Anchorman: The Legend of Ron Burgundy",
    "Elf", "Old School", "Daddy's Home", "A Night at the Roxbury", "Get Hard", "The Other Guys", "Zoolander"
  ];
  var url = "https://api.giphy.com/v1/gifs/search?q=";
  var movieGIFS = $("#movies");
  var movieButtons = $("#movie-buttons");

  //for pausing and animating gifs
  movieGIFS.on("click", ".img-thumbnail", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    console.log($(this).attr("class"));
    console.log($(this).attr("data-animate"));
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  function createButtons() {
    movieButtons.empty();
    movies.forEach(function (movieName) {
      var newButton = $("<button>");
      newButton.text(movieName);
      newButton.addClass("btn btn-primary");
      newButton.attr("data-content", movieName);
      movieButtons.append(newButton);
    })
  }

  // loads buttons when page is refreshed
  createButtons();

  //for adding additional buttons
  $("#additional-movies").on("click", function (event) {
    event.preventDefault();
    var movieName = $("#movie-input").val().trim();
    movies.push(movieName);
    createButtons();
  })

  // retrieves JSON from API
  $("button").on("click", function (event) {
    event.preventDefault();
    searchItem = $(this).attr("data-content");
    var queryURL = url + searchItem + "limit=10&api_key=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      formatAndAddGIPHY(response);
    })
  });

  // setting attributes and formatting images into rows and columns dynamically
  function formatDiv(image, div, animated, still) {
    image.attr("src", still);
    image.attr("data-animate", animated);
    image.attr("data-still", still);
    image.attr("data-state", "still");
    image.attr("width", "100%");
    image.addClass("img-thumbnail");
    div.css("text-align", "center");
    div.css("float", "right");
    div.addClass("col-md-4");
  }

  // function addNewRowDynamically(imageNumber, imageDiv, rowDiv){
  //   if(imageNumber % 3 == 0){
  //     var newRow = $("div");
  //     newRow.addClass("row");
  //     newRow.append(imageDiv);
  //     return newRow; 
  //   }
  //   else{
      
  //   }
  // }

  function formatAndAddGIPHY(response) {
    // var rowDiv;
    for (var i = 1; i < 11; i++) {
      console.log(response);
      var newDiv = $("<div>");
      var newImage = $("<img>")
      var stillGIF = response["data"][i]["images"]["fixed_width_still"]["url"];
      var animatedGIF = response["data"][i]["images"]["fixed_width"]["url"];
      var rating = response["data"][i]["rating"];
      formatDiv(newImage, newDiv, animatedGIF, stillGIF);
      newDiv.append(rating);
      newDiv.append(newImage);
      // rowDiv = addNewRowDynamically(i, newDiv, rowDiv);
      movieGIFS.prepend(newDiv);
    }
  }
})