function page_load() {
    if (localStorage.getItem('localQuestionId') == null) {
        localStorage.setItem('localQuestionId', 1);
    }
    check_question_id();
    get_question(localStorage.getItem('localQuestionId'));
}

function get_question(id) {
    d3.json("/api/question/" + id, {
        method: "GET"
    }).then(function (response) {
        const data = response.data; // Hent data ud af response
        console.log("data: ", data[0].name);

        d3.select('#option_0_button').text(data[0].name.split(",")[0]);
        d3.select('#option_1_button').text(data[1].name.split(",")[0]);
    })
}

function update_answer(question_id, option_chosen) {
    if (localStorage.getItem('localAnswers') != null) {
        let local_answers = JSON.parse(localStorage.getItem('localAnswers'));
        local_answers.push(option_chosen);
        localStorage.setItem('localAnswers', JSON.stringify(local_answers));
    }
    else {
        let local_answers = [option_chosen];
        localStorage.setItem('localAnswers', JSON.stringify(local_answers));
    }

    d3.json(`/api/answer/${question_id}/${option_chosen}/${1}`, {
        method: "POST"
    })
}

function option_button_click(value) {
    update_answer(localStorage.getItem('localQuestionId'), value);
    location.href = '/answer.html';
}