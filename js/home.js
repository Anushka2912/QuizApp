"use strict";
// Use of global variable
// An object literal
var studentDetails = {
    name: '',
    email: '',
    password: '',
    storeInfo() {
        // Use of built-in method for the window object
        // Use of local storage
        // Use of this keyword to refer to the "name" and "email" property of studentsDetails object
        window.localStorage.setItem("name", this.name);
        window.localStorage.setItem("email", this.email);
    }
};
var isValid;

$(document).ready(function(){
    
     // Use of form validation on three inputs name, email and password
    $("#registrationForm").submit(function() {
        // Use of try catch method in order to deal with runtime errors while submittimg the form
        try {
            isValid = true;
            // Accessing an objects property using dot notation
            studentDetails.name = $("#fname").val();
            studentDetails.email = $("#emailAddress").val().trim();
            studentDetails.password = $("#password").val();

            // A custom function using parameters
            validateName(studentDetails.name);
            validateEmail(studentDetails.email);
            validatePassword(studentDetails.password);
            
            /* Use of if statement */
            if (!isValid) {
                event.preventDefault();
            } else {
                // Access an objects method using dot notation
                studentDetails.storeInfo();
            }
        } catch (error) {
            $.notify("Oops! An unknown error occured, please retry after sometime.",  "error");
            console.error(error);
            event.preventDefault();
        } 
    });

    // A custom function using parameters
    function validateName(name) {
        //Use of if...else statement
        if (name == "") { 
            $.notify("Name is required!", "error");
            $("#fname").focus();
            isValid = false;
        }
    }

    function validateEmail(email) {
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        if (email == "") { 
            $.notify("Email is required!", "error");
            $("#emailAddress").focus(); //Use of focus event
            isValid = false;
        } else if ( !emailPattern.test(email) ) {  //Use of Not operator
            $.notify("Please enter a valid email address", "error");
            $("#emailAddress").focus();
            isValid = false;
        }
    }

    function validatePassword(password) {
        const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (password == "") { 
            $.notify("Password is required!", "error");
            $("#password").focus();
            isValid = false;
        } else if ( !passwordPattern.test(password) ) {
            $.notify("Invalid password!",  "error");
            $.notify("Password must contain 1 Uppercase, 1 Lowercase, 1 Number and should have a length of minimum 6 characters.",
            "warn");
            $("#password").focus();
            isValid = false;
        }
    }
});