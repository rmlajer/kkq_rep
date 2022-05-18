function page_load() {
    check_question_id();
    get_question(localStorage.getItem('localQuestionId'));
    get_answer();
    d3.select('#progress').text(`${localStorage.getItem('localQuestionId')}/10`);
}

//Counts question in localStorage
function update_question_id() {
    let question_id = JSON.parse(localStorage.getItem("localQuestionId"));
    localStorage.setItem('localQuestionId', ++question_id);
}

//Controls button clicks, redirects to href value from button, after question 10 directs to result.
function next_button_click() {
    let question_id = localStorage.getItem('localQuestionId');
    update_question_id();
    if (question_id < 10) {
        location.href = '/question.html';
    }
    else {
        location.href = '/result.html';
    }
}

function get_question(id) {
    d3.json("/api/question/" + id, {
        method: "GET"
    }).then(function (response) {
        const data = response.data; // Hent data ud af response


    })
}

function get_answer() {
    fetch('/api/questionbreakdown/' + localStorage.getItem("localQuestionId"))
        .then(response => response.json())
        .then(data => {

            console.log(data);
            let currentQuestion = localStorage.getItem("localQuestionId");
            let correctAnswer;
            let answers = JSON.parse(localStorage.getItem('localAnswers'));

            d3.select('#quiz_answer_0_text_container')
                .append("p")
                .text(parseFloat(data.data[0].co2e_per_kg).toFixed(2));
            d3.select('#quiz_answer_0_icon_container')
                .append("img")
                .attr("src", `images/icon_${currentQuestion}_0.png`);
            d3.select('#quiz_answer_1_text_container')
                .append("p")
                .text(parseFloat(data.data[1].co2e_per_kg).toFixed(2));
            d3.select('#quiz_answer_1_icon_container')
                .append("img")
                .attr("src", `images/icon_${currentQuestion}_1.png`);

            if (parseFloat(data.data[0].co2e_per_kg) < parseFloat(data.data[1].co2e_per_kg)) {
                correctAnswer = 0;
            } else {
                correctAnswer = 1;
            }

            if (answers[currentQuestion - 1] == correctAnswer) {
                d3.select('#quiz_answer').text(`Du svarede rigtigt! ${data.data[correctAnswer].name.split(",")[0]} udleder MINDRE co2e end ${data.data[1 - correctAnswer].name.split(",")[0]}.`);
                console.log(`#quiz_answer_${correctAnswer}_checkmark`);
                d3.select(`#quiz_answer_${correctAnswer}_checkmark`)
                    .style("background-color", "#90da50")
                    .append("img")
                    .attr("src", "images/checkmark.png");
            } else {
                d3.select('#quiz_answer').text(`Du svarede forkert! ${data.data[1 - correctAnswer].name.split(",")[0]} udleder MERE co2e end ${data.data[correctAnswer].name.split(",")[0]}.`);
                console.log(`#quiz_answer_${1 - correctAnswer}_checkmark`);
                d3.select(`#quiz_answer_${1 - correctAnswer}_checkmark`)
                    .style("background-color", "#444444")
                    .append("img")
                    .attr("src", "images/cross.png");
            }

            const barPadding = 2;
            let dataset = [];
            let textData = ["Landbrug", "iLUC", "Forarbejdning", "Emballage", "Transport", "Detailhandel"];
            let yOffset = 10;

            dataset.push(parseFloat(data.data[0].agriculture));
            dataset.push(parseFloat(data.data[1].agriculture));
            dataset.push(parseFloat(data.data[0].iluc));
            dataset.push(parseFloat(data.data[1].iluc));
            dataset.push(parseFloat(data.data[0].processing));
            dataset.push(parseFloat(data.data[1].processing));
            dataset.push(parseFloat(data.data[0].packaging));
            dataset.push(parseFloat(data.data[1].packaging));
            dataset.push(parseFloat(data.data[0].transport));
            dataset.push(parseFloat(data.data[1].transport));
            dataset.push(parseFloat(data.data[0].retail));
            dataset.push(parseFloat(data.data[1].retail));

            console.log(dataset);

            const svg = d3.select("#emission_breakdown")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "500px");

            maxX = d3.max(dataset, function (d) {
                return d;
            });

            minX = d3.min(dataset, function (d) {
                if (d <= 0) {
                    return d;
                }
                else {
                    return 0;
                }
            });

            var scale = d3.scaleLinear()
                .domain([minX, maxX/* - ((minX < 0) ? minX : 0)*/])
                .range([0, 100]);
                

            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function (d, i) {
                    return ((100 - 5 * barPadding) / dataset.length * i + Math.floor(i / 2) * barPadding) + "%";
                })
                .attr("y", function (d) {

                    return (100 - scale(0) - scale((d < 0) ? d : d + minX)) + "%";
                })
                .attr("width", ((100 - 5 * barPadding) / dataset.length) + "%")
                .attr("height", function (d) {
                    //console.log("d: " + d + " -  scale: " + scale(d + minX));
                    return (scale((d < 0) ? -d + minX : d + minX)) + "%";
                })
                .attr("fill", function (d, i) {
                    return (i % 2 == 0) ? "#f98a2f" : "#69a3b2";
                });

            svg.append("line")
                .attr("x1", "0%")
                .attr("x2", "100%")
                .attr("y1", (100 - scale(0)) + "%")
                .attr("y2", (100 - scale(0)) + "%")
                .attr("stroke", "#444444")
                .attr("stroke-width", (minX<0) ? 1 : 2);


            const textSvg = d3.select("#emission_breakdown")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "5vh");

            textSvg.selectAll("text")
                .data(textData)
                .enter()
                .append("text")
                .attr("x", function (d, i) {
                    return ((100 / textData.length + 0.15 * barPadding) * i) + barPadding + "%";
                })
                .attr("y", "2vh")
                .attr("fill", "black")
                .attr("font-family", "Verdana")
                .text(function (d) {
                    return d;
                })
        });
}