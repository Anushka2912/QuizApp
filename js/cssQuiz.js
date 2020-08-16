"use strict";
// Use of global variable
var currentQuestion = 1;
// Use of Array to store questions, options and answers
var questionAnswersOptions = [
   {
      question: "If we want define style for an unique element, then which css selector will we use ?",
      options: [
         "id",
         "text",
         "class",
         "name"
      ],
      answerIndex: 1,
   },
   {
      question: "If we don't want to allow a floating div to the left side of an element, which css property will we use ?",
      options: [
         "margin",
         "clear",
         "float",
         "padding"
      ],
      answerIndex: 2,
   },
   {
      question: "If we want to wrap a block of text around an image, which css property will we use ?",
      options: [
         "wrapB",
         "push",
         "float",
         "align"
      ],
      answerIndex: 3,
   },
   {
      question: "Which attribute can be added to many HTML / XHTML elements to identify them as a member of a specific group ?",
      options: [
         "id",
         "div",
         "class",
         "span"
      ],
      answerIndex: 3,
   },
   {
      question: "Which css property you will use if you want to add some margin between a DIV's border and its inner text ?",
      options: [
         "spacing",
         "margin",
         "padding",
         "inner-margin"
      ],
      answerIndex: 3,
   },
   {
      question: "Which CSS property is used to control the text size of an element ?",
      options: [
         "True",
         "False"
      ],
      answerIndex: 1,
   },
   {
      question: "Block elements are normally displayed without starting a new line.",
      options: [
         "font-style",
         "text-size",
         "font-size",
         "text-style"
      ],
      answerIndex: 3,
   }
];

// Use object literal. This will keep the track of user's marked answer
var answerByStudent = {}; 
var totalMarks = 0;

$(document).ready(function(){
   $("#questionBox").hide();
        
   $("#startBtn").click(function(){  // Use of Click Event on start quiz button
       $(".instructions").hide() // hide() Jquery method hides the selected elements.
       $("#startBtn").hide() // show() Jquery method shows the selected elements.
       $(".questionList").show();
       showQuestionList();
       $("#questionBox").show()  
       showQuestion(currentQuestion);
    });
    
   $("#nextBtn").click(function(){ // Use of Click Event on Next button
      ++currentQuestion;
      showQuestion(currentQuestion);
   });

   $("#submitBtn").click(function(){ // Use of Click Event on Submit button
      $("#questionBox").hide()
      $(".questionList").hide()
      $("#submitBtn").hide()
      $("#nextBtn").hide()
      $(".resultBox").show()
      $("#mo").text(totalMarks)      
    });
    
    $("#goBack").click(function(){ // Use of Click Event on Go back to quiz palette button
       location.href = "quizSelection.html"; //Use of href property of location object to redirect to another webpage
    });
    
});

//Custom function without any paramater to show the Question list in the sidebar like "Question 1 Question 2" etc
function showQuestionList() {
    var questionMenu = '';
    //Use of for loop
    for ( var i = 0; i < questionAnswersOptions.length; i++ ) {
        //Attached event listener in the below statement. Event is "onclick" and Event Listener is "showQuestion()"
        questionMenu += '<label id="q'+(i+1)+'" onclick="showQuestion(' + (i+1) + ')" class="labelDesign">Question ' + (i+1) + '</label>';
    }
    $(".questionList").html(questionMenu);
}

//Custom function with one paramater to display question number dynamically like "Question 1 of 7"
function showQuestionCounter(questionNumber) {
    return "Question " + (questionNumber) + " of " + questionAnswersOptions.length;
}

//Custom function with one paramater to display the related question details when you click on a question in the sidebar
function showQuestion(questionNumber) {
    
    currentQuestion = questionNumber;
    var questionDetails = questionAnswersOptions[questionNumber-1];;
    var question = questionDetails.question;
    var options = questionDetails.options;
    
    $("#questionTxt").html(question);
    $("#questionCounter").html(showQuestionCounter(questionNumber));
    var optionsHtml = "";
    $('#optionsContainer').html(optionsHtml);
    
    for ( var i = 0; i < options.length; i++ ) {
        // Use of AND operator
        if ( answerByStudent[questionNumber] && answerByStudent[questionNumber] === (i+1) ) {
            optionsHtml += '<input type="radio" name="option" checked onclick="calculateMarks('+(i+1)+');"><label id="opt'+(i+1)+'">' + options[i] + '</label><br>';
        } else {
            optionsHtml += '<input type="radio" name="option" onclick="calculateMarks('+(i+1)+');"><label id="opt'+(i+1)+'">' + options[i] + '</label><br>';
        }
    }
    $('#optionsContainer').html(optionsHtml);
    if(questionNumber === questionAnswersOptions.length){
        $("#nextBtn").hide()
    }else{
        $("#nextBtn").show()
    }
}

//Custom fumction without any paramater to get the username from local storage
function getStudentName() {
    return window.localStorage.getItem('name');
}

//Custom function with one parameter to calculate the total Marks
function calculateMarks(answer) {
    var isCorrect = false;
    answerByStudent[currentQuestion] = answer;
    for ( var i = 0; i < questionAnswersOptions.length; i++) {
        if ( i === currentQuestion-1 && questionAnswersOptions[i].answerIndex === answer) {
            isCorrect = true;
            totalMarks += 1;
        }
    }
}