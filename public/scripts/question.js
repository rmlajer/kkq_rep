function page_load() {
    if (localStorage.getItem('localQuestionId') == null) {
        localStorage.setItem('localQuestionId', 1);
    }
    check_question_id();
    get_question(localStorage.getItem('localQuestionId'));
}

//Henter svarmuligheder fra question database og appender disse til button text, fjerner alt efter første komma
function get_question(id) {
    d3.json("/api/question/" + id, {
        method: "GET"
    }).then(function (response) {
        const data = response.data; // Hent data ud af response


        d3.select('#option_0_button').text(data[0].name.split(",")[0])
            .append("img")
            .attr("src", `images/icon_${id}_0.png`);
        d3.select('#option_1_button').text(data[1].name.split(",")[0])
            .append("img")
            .attr("src", `images/icon_${id}_1.png`);

        
    })
}

//Tjekker om localAnswers eksisterer, parser til array og pusher option_chosen. Hvis localAnswers ikke eksisterer laves denne. 
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
    //POST question_id og option_chosen til API - SIDSTE POST SKAL ÆNDRES 
    d3.json(`/api/answer/${question_id}/${option_chosen}`, {
        method: "POST"
    })
}

function option_button_click(value) {
    update_answer(localStorage.getItem('localQuestionId'), value);
    location.href = '/answer.html';
}