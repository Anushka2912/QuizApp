"use strict";
$(document).ready(function(){

    const userName = getStudentName();
    $('.userName').html(userName);
    
    // Use of an Array to display month names
    
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    
    // Use of 5 built-in methods for the Date() object

    var today = new Date();
    var val = today.getDate()+"-"+monthNames[today.getMonth()]+"-"+today.getFullYear();
    $("#dynamicDate").text(val);
    
    var h = today.getHours(); 
    var m = today.getMinutes();
    var time = "AM";
    if (h >= 12) 
    {
        h = h - 12;
        time = "PM";
    }
    if (h == 0) 
    {
        h = 12;
    }
    
    // A custom function to insert 0 in front of a single digit number 

    var padSingleDigit = function(num) 
    {
        if (num < 10) 
        {	
            return "0" + num; 
        }else { 
            return num; 
        }
    };
    
    var timeVal = padSingleDigit(h)+" : "+padSingleDigit(m)+" "+time;
    $("#dynamicTime").text(timeVal);

});

// Use of a custom function to get the user's name from the local storage
function getStudentName() {
    return window.localStorage.getItem('name');
}
