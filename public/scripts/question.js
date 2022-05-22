function page_load() {
    if (localStorage.getItem('localQuestionId') == null) {
        localStorage.setItem('localQuestionId', 1);
    }
    d3.select('#progress').text(`${localStorage.getItem('localQuestionId')}/10`);
    check_question_id();
    get_question(localStorage.getItem('localQuestionId'));
    back_restriction();

    d3.select("#co2e")
        .on("mouseover", function () {
            d3.select("#tooltip").classed("hidden", false);
            d3.select("#tooltip")
                .style("left", document.getElementById("co2e").getBoundingClientRect().left + (document.getElementById("co2e").getBoundingClientRect().width / 2) - (document.getElementById("tooltip").getBoundingClientRect().width / 2) + "px")
                .style("top", document.getElementById("co2e").getBoundingClientRect().bottom + 3 + "px");
        })
        .on("mouseout", function () {
            d3.select("#tooltip").classed("hidden", true);
        });
}

function back_restriction() {
    let local_answers = JSON.parse(localStorage.getItem('localAnswers'));
    if (local_answers != null && local_answers.length >= localStorage.getItem('localQuestionId')) {

        d3.select(`#option_button_${1 - local_answers[localStorage.getItem('localQuestionId') - 1]}`).style("opacity", "50%");

        document.getElementById("option_button_0").disabled = true;
        d3.select('#option_button_0').style("cursor", "default");
        d3.select('#option_button_0').style("transform", "none");

        document.getElementById("option_button_1").disabled = true;
        d3.select('#option_button_1').style("cursor", "default");
        d3.select('#option_button_1').style("transform", "none");

        document.getElementById('div_question_next_button').style.visibility = "visible";
    }
}


//Henter svarmuligheder fra question database og appender disse til button text, fjerner alt efter første komma
function get_question(id) {
    d3.json("/api/question/" + id, {
        method: "GET"
    }).then(function (response) {
        const data = response.data; // Hent data ud af response

        d3.select('#option_button_0').text(data[0].name.split(",")[0])
            .append("img")
            .attr("src", `images/icon_${id}_0.png`);
        d3.select('#option_button_1').text(data[1].name.split(",")[0])
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
    back_restriction();
    location.href = '/answer.html';
}