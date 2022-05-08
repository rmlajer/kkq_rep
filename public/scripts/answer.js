function page_load() {
    check_question_id();    
}

//Counts question in localStorage
function update_question_id(){
    let question_id = JSON.parse(localStorage.getItem("localQuestionId"));
    localStorage.setItem('localQuestionId', ++question_id);
}

//Controls button clicks, redirects to href value from button, after question 10 directs to result.
function next_button_click() {
    let question_id = localStorage.getItem('localQuestionId');
    update_question_id();
    if(question_id<10){
        location.href = '/question.html';
    }
    else {
        location.href = '/result.html'
    } 
}
