$(document).ready(function() {
  // add an event listener (performSearch) to the form
  $("#query-form").submit(function(event) { performSearch(event); });
});


var pat,flag=0;
function formatSearchResults(jsonResults) {

  var jsonObject = jsonResults;
 
  //var siteCount = 0;

  
   

    $("#search-results-heading").text("Search Results");
    var formatedText = "";

    jsonObject.Countries.forEach(
      function(item, index) {

        
        if(item.Country.toLowerCase()==pat.toLowerCase()){
        var thumbnail = item.NewConfirmed;
        

       
       formatedText += "<div class='dish-ingredients-div'><h3>TotalConfirmed : " + item.TotalConfirmed + "<h3></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>NewDeaths : " + item.NewDeaths + "<h3></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>NewConfirmed : " + item.NewConfirmed + "<h3></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>NewRecovered : " + item.NewRecovered + "<h3></div>";
       flag=1;
        return;
      }
    }
    );

$("#results").html(formatedText);
  if(!flag){setNotFoundMessages();}

}

function performSearch(event) {

  var request;

  event.preventDefault();

  if (request) {
      request.abort();
  }

  var $form = $(this); 

  $("#search-results-heading").text("Searching ...");
  $("#results").text("");

  request = $.ajax({
      url:"https://api.covid19api.com/summary",
      type: "GET",
    
  });

pat=$("#ingredients").val();

  request.done(function (response,textStatus, jqXHR){
    formatSearchResults(response);
    console.log(pat)
  });

  // Callback handler for failure

  request.fail(function (jqXHR, textStatus, errorThrown){
      $("#search-results-heading").text("Sorry We Unable to fetch Covid Data.Try again.");
      $("#results").text("");
  });
}

// This function clears the search results and the heading "Search Results"

function resetResults() {
  $("#search-results-heading").text("");
  $("#results").text("");
  flag=0;
}

