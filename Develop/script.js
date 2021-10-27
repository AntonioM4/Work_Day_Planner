// global varables
var hourlyTime;
var currentTime = moment();
var currentHour;
var textBlock = $(".col-8");
var plannerTask = $("textarea");
$.each(plannerTask, function () {
    this.value = "";
});

if (localStorage.getItem('localHourlyTask')) {
    hourlyTime = JSON.parse(localStorage.getItem('localHourlyTask'))
}else{
    hourlyTime = [];
};

// display current date 
$('#currentDay').text(`${currentTime.format('dddd, MMMM Do')}`);