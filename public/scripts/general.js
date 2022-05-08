function test () {
    console.log("test");
}

//Simple log check for localQuestionCounter.
function check_question_id() {
    console.log("localQuestionId: " + localStorage.getItem('localQuestionId'));
    console.log("localAnswers: " + localStorage.getItem('localAnswers'));
}

//Controls button clicks, redirects to href value from button, after question 10 directs to result.
function next_button_click() {
    let question_id = localStorage.getItem('localQuestionId');
    if(question_id<10){
        location.href = '/question.html';
    }
    else {
        location.href = '/result.html'
    } 
}