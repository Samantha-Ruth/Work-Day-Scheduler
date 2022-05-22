var DateTime = luxon.DateTime;

// Display current day
  $("#currentDay").text(DateTime.now().toFormat('MMMM dd, yyyy'));
  // dynamically create work day list
  // *** still need to figure out how to add time of day!!! Needs to connect to current time...***

// create date to put into timeOfDayEl
var times = function () {
  dt = DateTime.fromObject({day: 22, hour: 12 }, { zone: 'America/Los_Angeles', numberingSystem: 'beng'})
}
console.log(times);



  // Start a function when loading the page:
// function buildCard(timeOfDay) {

var rowEl = $("<div>").addClass("row");
$(".container").append(rowEl);

// Create skeleton of times/event/save button
var timeOfDayEl = $("<div>").addClass("time-of-day col-1 list-group-item d-flex align-items-center");
$(timeOfDayEl).text("9 AM");
$(rowEl).append(timeOfDayEl);

var eventEl = $("<div>").addClass("col-10 list-group-item bg-light time-block d-flex justify-content-left border-dark border-top-0 border-bottom-0");
$("eventEl").attr("id", "time-block");
$(rowEl).append(eventEl);
var paragraphEl = $("<p>").addClass("event-paragraph col-12 d-flex justify-content-left w-100 h-100 event-paragraph bg-danger");
$(eventEl).append(paragraphEl);

var saveButtonEl = $("<div>").addClass("col-1 list-group-item bg-info justify-content-center d-flex align-items-center w-100 p-3 rounded-right");
$(saveButtonEl).add("<span>").addClass("oi oi-calendar text-light");
$(rowEl).append(saveButtonEl);
// }


//task text was clicked
$(".event-paragraph").on("click", function() {
  // get current text of p element
  var text = $(this)
  .text()
  // putting items on new lines creates readability
  .trim();
  // replace p element with a new text area
  var textInput = $("<textarea>").addClass("list-group-item").val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});


//Need to create loop based on times
//THIS CHANGES THE COLORS? WRITTEN IN MOMENT - NEED TO FIX TO LUXON?
var auditEvent = function(eventEl) {
  // get time from span element (once you figure out how to set it)
  var time = $(eventEl).find(".time-of-day").text().trim();
  // remove any old classes from Element
  $(eventEl).removeClass("list-group-item-warning list-group-item-light list-group-item-danger");
  // apply new class if task is near/over due date
  if(moment().isAfter(time)) {
    $(eventEl).addClass("list-group-item-light");
  } 
  if(moment().is(time)){
  $(eventEl).addClass("list-group-item-warning");
  }
  else {
    $(eventEl).addClass("list-group-item-success");
  }
};

buildCard();