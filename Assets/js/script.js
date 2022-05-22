// Display current day using Moment
$("#currentDay").text(moment().format("MMM Do, YYYY"));

var events = []; 

// var eventTimeObj = {
//   name: eventNameInput,
//   type: eventTypeInput
// }
// events.push(eventTimeObj);

var timeNowEl = $(".time-now").text(moment());


  // Start function when loading the page:
function buildCard() {

  var rowEl = $("<div>")
    .addClass("row");

    $(".container").append(rowEl);

  // // Create skeleton of times/event/save button
  var timeOfDayEl = $("<div>")
    .addClass("time-of-day col-2 list-group-item d-flex justify-content-end align-items-center border-left-0");
    $(timeOfDayEl).text(moment().hour([9 + i]).format('h A'));

    $(rowEl).append(timeOfDayEl);

  var eventEl = $("<div>")
    .addClass("time-block col-9 list-group-item d-flex justify-content-start border-white");
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

  // THIS CHANGES THE COLORS? WRITTEN IN MOMENT - NEED TO FIX TO LUXON?
  var auditEvent = function() {
    // get time from span element (once you figure out how to set it)
    var time = $(timeOfDayEl).find("div").text().trim();
    // remove any old classes from Element
    $(".time-block").removeClass("list-group-item-warning list-group-item-light list-group-item-danger");
    // apply new class if task is near/over due date
    if(moment().isAfter(time) , 'hour') {
      $(".time-block").addClass("bg-secondary");
    } 
    if(moment().isSame(time)){
    $(".time-block").addClass("bg-danger");
    }
    else {
      $(".time-block").addClass("bg-success");
    }
  }
  auditEvent();
}

// for loop to build time slots for work hours
for (var i = 0; i < 9; i++) {
  buildCard()
};


// If time slot is clicked
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
});


// THIS IS NEEDED!!!  NEED TO SAVE TASKS TO LOCAL STORAGE  CHANGE TO SAVEEVENTS?
var saveEvents = function() {
  localStorage.setItem("events", JSON.stringify());
};
// save button was clicked - save to local Storage


// // **** HELP!!!!  THIS ISN'T SAVING TO LOCAL STORAGE !
$(".save-button").click(function() {
  console.log("save button was clicked!");
  // get form values
  var eventText = $(".text-area").val();
  console.log(eventText);
  var eventTime = $(".text.-area").val();
 // save in tasks array
  events.push({
     text: eventText, 
      });
  saveEvents();
  })
      
  console.log(events);


// audit task due dates every 30 minutes
setInterval(function() {
  $(".time-block .text-area").each(function() {
    auditTask($(this));
  });
}, 1800000);










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


