// This creates the task, including all of the styling and formatting.  Already have,
// but may need a create task that opens the time bar and makes it editable
var createTask = function(taskText, taskDate, taskList) {
    // create elements that make up a task item
    var taskLi = $("<li>").addClass("list-group-item");
    var taskSpan = $("<span>")
      .addClass("badge badge-primary badge-pill")
      .text(taskDate);
    var taskP = $("<p>")
      .addClass("m-1")
      .text(taskText);
  
    // append span and p element to parent li
    taskLi.append(taskSpan, taskP);
  
    // check due dates
    auditTask(taskLi);
  
    // append to ul list on the page
    $("#list-" + taskList).append(taskLi);
  };

  var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = {
      toDo: [],
      inProgress: [],
      inReview: [],
      done: []
    };
  } 


  //  THIS MAY BE IMPORTANT FOR CHECKING ITEMS EVERY 30 SEC? 
  // loop over object properties
  $.each(tasks, function(list, arr) {
    console.log(list, arr);
    // then loop over sub-array
    arr.forEach(function(task) {
      createTask(task.text, task.date, list);
    });
  });
};

// THIS IS NEEDED!!!  NEED TO SAVE TASKS TO LOCAL STORAGE  CHANGE TO SAVEEVENTS?
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

    // THIS CHANGES THE COLORS? WRITTEN IN MOMENT - NEED TO FIX TO LUXON?
    var auditEvent = function(eventEl) {
        // get time from span element (once you figure out how to set it)
        var time = $(eventEl).find("span").text().trim();
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


// task text was clicked
$(".time-block").on("click", "p", function() {
    // get current text of p element
    var text = $(this)
    .text()
    // putting items on new lines creates readability
    .trim();
  
    // replace p element with a new text area
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
  });
  
  // editable field was un-focused
  $(".list-group").on("blur", "textarea", function() {
    // get the text area's current value/text
    var text = $(this).val();  
  });


  // audit task due dates every 30 minutes
setInterval(function() {
  $(".card .list-group-item").each(function() {
    auditEvent($(this));
  });
}, 1800000);