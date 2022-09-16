// Display current day using Moment
$("#currentDay").text(moment().format("MMM Do, YYYY"));
var events = [];
var tasks = [];
var now = moment().format("h");
// var timeNowEl = $(".time-now").text(moment());
// console.log(timeNowEl)

// Start function when loading the page:
function buildCard() {
  var rowEl = $("<div>").addClass("row");
  $(".container").append(rowEl);

  // // Create skeleton of times/event/save button
  var timeOfDayEl = $("<div>").addClass(
    "time-of-day col-2 list-group-item d-flex justify-content-end align-items-center border-left-0"
  );
  $(timeOfDayEl).text(
    moment()
      .hour([9 + i])
      .format("h A")
  );

  $(rowEl).append(timeOfDayEl);

  var eventEl = $("<div>").addClass(
    "time-block col-9 list-group-item d-flex justify-content-start border-white"
  );
  $("eventEl").attr("id", "time-block");

  $(rowEl).append(eventEl);

  var paragraphEl = $("<p>").addClass(
    "event-paragraph col-12 d-flex justify-content-left w-100 h-100"
  );
  $("paragraphEl").attr("id", "event-paragraph");

  $(eventEl).append(paragraphEl);

  var saveButtonEl = $("<div>").addClass(
    "save-button col-1 list-group-item bg-info justify-content-center d-flex align-items-center w-100 p-3 rounded-right"
  );
  $(saveButtonEl).add("<span>").addClass("text-light fas fa-save");
  $(rowEl).append(saveButtonEl);

  // Change the colors based on time
  var auditEvent = function () {
    // get time from span element
    var time = $(timeOfDayEl).find("div").text().trim();
    console.log(time)
    // remove any old classes from Element
    $(".time-block").removeClass(
      "list-group-item-warning list-group-item-light list-group-item-danger"
    );
    // apply new class if task is near/over due date
    if ((moment().isAfter(time), "hour")) {
      $(".time-block").addClass("bg-secondary");
    }
    if (moment().isSame(time)) {
      $(".time-block").addClass("bg-danger");
    } else {
      $(".time-block").addClass("bg-success");
    }
  };
  auditEvent();
  // audit task due dates every 30 minutes
  setInterval(function () {
    $(".time-block .text-area").each(function () {
      auditTask($(this));
    });
  }, 1800000);
}

// for loop to build time slots for work hours
for (var i = 0; i < 9; i++) {
  buildCard();
}

// If time slot is clicked
$(".event-paragraph").click(function () {
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
var saveEvents = function () {
  localStorage.setItem("events", JSON.stringify());
};
// save button was clicked - save to local Storage

// // **** HELP!!!!  THIS ISN'T SAVING TO LOCAL STORAGE !
$(".save-button").click(function () {
  console.log("save button was clicked!");
  // get form values
  var eventText = $(".text-area").val();
  var eventTime = $(".time-of-day").val();
  console.log(eventText);
  console.log(eventTime);
  // save in tasks array
  events.push({
    text: eventText,
    time: eventTime,
  });
  saveEvents();
});

// get items from local storage
var loadEvents = function () {
  var savedEvents = localStorage.getItem("events");
  // parse into array of objects
  savedEvents = JSON.parse(savedEvents);
  // loop through savedTasks array
  for (var i = 0; i < savedEvents.length; i++) {
    // pass each task object into the `createTaskEl()` function
    buildCard(savedEvents[i]);
  }
};
