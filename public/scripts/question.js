function page_load() {
    check_question_id();
}

//Counts question in localStorage
function update_question_id(){
    let question_id = JSON.parse(localStorage.getItem("localQuestionId"));
    localStorage.setItem('localQuestionId', ++question_id);
}

function update_answer(option_chosen) {
    if(localStorage.getItem('localAnswers') != null){
        let local_answers = JSON.parse(localStorage.getItem('localAnswers'));
        local_answers.push(option_chosen);
        localStorage.setItem('localAnswers', JSON.stringify(local_answers));
    }
    else {
        let local_answers = [option_chosen];
        localStorage.setItem('localAnswers', JSON.stringify(local_answers));
    }
}

function option_button_click(value) {
    update_question_id();
    update_answer(value);
    location.href = '/answer.html';
}