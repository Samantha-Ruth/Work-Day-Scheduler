// **** FOR LUXON DATE
// var DateTime = luxon.DateTime;

// Display current day **  FOR LUXON DATE
  // $("#currentDay").text(DateTime.now().toFormat('MMMM dd, yyyy'));
  $("#currentDay").text(moment())
  // dynamically create work day list
  // *** still need to figure out how to add time of day!!! Needs to connect to current time...***
// adding time of day
//create object

var timeofDay = ["9", "10", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
var events = []; 

var timeNowEl = $(".time-now").text(moment());


for (var i = 0; i < timeofDay.length; i++) {
  buildCard()
};

  // Start a function when loading the page:
function buildCard(timeOfDay) {

var rowEl = $("<div>")
  .addClass("row");

  $(".container").append(rowEl);

// Create skeleton of times/event/save button
var timeOfDayEl = $("<div>")
  .addClass("time-of-day col-1 list-group-item d-flex align-items-center");
  $(timeOfDayEl).text(moment().hour([9 + i]));

  $(rowEl).append(timeOfDayEl);

var eventEl = $("<div>")
  .addClass("col-10 list-group-item bg-light time-block d-flex justify-content-left border-dark border-top-0 border-bottom-0");
  $("eventEl").attr("id", "time-block");

  $(rowEl).append(eventEl);

var paragraphEl = $("<p>")
  .addClass("event-paragraph col-12 d-flex justify-content-left w-100 h-100");
  $("paragraphEl").attr("id", "event-paragraph");
  
  $(eventEl).append(paragraphEl);

var saveButtonEl = $("<div>")
  .addClass("save-button col-1 list-group-item bg-info justify-content-center d-flex align-items-center w-100 p-3 rounded-right");
$(saveButtonEl).add("<span>")
  .addClass("oi oi-calendar text-light");

  $(rowEl).append(saveButtonEl);




//event text was clicked
// // create event
$(".event-paragraph").click(function() {
  // get current text of p element
  var text = $(this)
  .text()
  // putting items on new lines creates readability
  .trim();
  // replace p element with a new text area
  var textInput = $("<textarea>").addClass("text-area border-left-0").val(text);
  $(this).replaceWith(textInput);
  // auto focus new element
  textInput.trigger("focus");
})};

// save button was clicked

// **** HELP!!!!  THIS ISN'T SAVING TO LOCAL STORAGE !
$(".save-button").click(function() {
  console.log("save button was clicked!");
  // get form values
  var eventText = $(".text-area").val();
  console.log(eventText);
 // save in tasks array
  events.push({
     text: eventText, 
      });

  var saveEvents = function() {
  localStorage.setItem("events", JSON.stringify());
  };
      
  console.log(events);
   }
);




// THIS IS NEEDED!!!  NEED TO SAVE TASKS TO LOCAL STORAGE  CHANGE TO SAVEEVENTS?
// var saveEvents = function() {
//   localStorage.setItem("events", JSON.stringify());
// };





  // THIS CHANGES THE COLORS? WRITTEN IN MOMENT - NEED TO FIX TO LUXON?
  var auditEvent = function() {
      // get time from span element (once you figure out how to set it)
      var time = $(timeOfDayEl).find("div").text().trim();
      // remove any old classes from Element
      $(".event-paragraph").removeClass("list-group-item-warning list-group-item-light list-group-item-danger");
      // apply new class if task is near/over due date
      if(moment().isAfter(time) , 'hour') {
        $(".event-paragraph").addClass("bg-success");
      } 
      if(moment().is(time)){
      $(".event-paragraph").addClass("bg-warning");
      }
      else {
        $(".event-paragraph").addClass("bg-success");
      }
    }
      auditEvent();


// audit task due dates every 30 minutes
// setInterval(function() {
//   $(".card .list-group-item").each(function() {
//     auditTask($(this));
//   });
// }, 1800000);




// create date to put into timeOfDayEl
// var times = function () {
//   dt = DateTime.fromObject({day: 22, hour: 12 }, { zone: 'America/Los_Angeles', numberingSystem: 'beng'})
//   console.log(dt);
// }


