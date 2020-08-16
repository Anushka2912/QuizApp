"use strict";
// Use of global variable
var currentQuestion = 1;
// Use of Array to store questions, options and answers
var questionAnswersOptions = [
   {
      question: "Choose the correct HTML element for the largest heading:",
      options: [
         "h6",
         "heading",
         "h1",
         "head"
      ],
      answerIndex: 3,
   },
   {
      question: "The attribute of &#60;form&#62; tag :",
      options: [
         "Method",
         "Action",
         "Both &#40;a&#41; &amp; &#40;b&#41;",
         "None of these"
      ],
      answerIndex: 3,
   },
   {
      question: "HTML is a subset of",
      options: [
         "SGMT",
         "SGML",
         "SGMD",
         "None of these"
      ],
      answerIndex: 1,
   },
   {
      question: "The attribute, which define the relationship between current document and HREF'ed URL is: ",
      options: [
         "REL",
         "URL",
         "REV",
         "All of these"
      ],
      answerIndex: 1,
   },
   {
      question: "&#60;DT&#62; tag is designed to fit a single line of a web page but &#60;DD&#62; tag will accept a:",
      options: [
         "line of text",
         "full paragraph",
         "word",
         "request"
      ],
      answerIndex: 2,
   },
   {
      question: "Inline elements are normally displayed without starting a new line.",
      options: [
         "True",
         "False"
      ],
      answerIndex: 1,
   },
   {
      question: "Block elements are normally displayed without starting a new line.",
      options: [
         "True",
         "False"
      ],
      answerIndex: 1,
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