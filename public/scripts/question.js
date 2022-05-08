

function page_load() {
   
    
}


//Counts question in localStorage
function question_counter(){
    var questionCounter = JSON.parse(localStorage.getItem("localQuestionCounter"));
    var newCount = questionCounter + 1;
    localStorage.setItem('localQuestionCounter', newCount);
    
}






function option_0_button_click() {
    console.log("clicked 0 " + questionNumber);
    questionNumber++;

}

function option_1_button_click() {
    console.log("clicked 1");
    test();
}