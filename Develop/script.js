// global varables
var hourlyTime;
var currentTime = moment();
var currentHour;
var textBlock = $(".col-8");
var task = $("textarea");
$.each(task, function () {
    this.value = "";
});

if (localStorage.getItem('localHourlyTask')) {
    hourlyTime = JSON.parse(localStorage.getItem('localHourlyTask'))
} else {
    hourlyTime = [];
};

// display current date 
$('#currentDay').text(`${currentTime.format('dddd, MMMM Do')}`);

// the current hour 
function updateSchedule() {
    textBlock.removeClass('past present future');
    $.each(textBlock, function (scheduleBlock) {
        if (scheduleBlock < (currentTime.hour() - 9)) {
            $(this).addClass('past');
        } else if (scheduleBlock == (currentTime.hour() - 9)) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });
    currentHour = currentTime.hour();
};


// delay animation and allowing animation to replay 
function updateLocalStorage() {
    event.preventDefault();
    let btnIndex = Number($(this).attr('id'));
    $('.alert-success').removeClass('alert-animation');

    if (task[btnIndex].value.trim() != "") {
        hourlyTime[btnIndex] = {
            time: $(".hour")[btnIndex].textContent.trim(),
            task: task[btnIndex].value
        };
        localStorage.setItem("localHourlyTasks", JSON.stringify(hourlyTime));
        setTimeout(function () {
            $('.alert-success').addClass('alert-animation');
            $('.alert-success').text(`Successfully saved task at ${$(".hour")[btnIndex].textContent.trim()}!`);
        }, 100);
    };
};

// Saved tasks 
function writeCurrentTasks() {
    $.each(hourlyTime, function (i) {
        if (hourlyTime[i]) {
            task[i].value = hourlyTime[i].task;
        };
    });
};


updateSchedule();
writeCurrentTasks();
$("button").click(updateLocalStorage);