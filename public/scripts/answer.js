function page_load() {
    check_question_id();
    get_question(localStorage.getItem('localQuestionId'));
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

        d3.select('#quiz_answer_0').text(data[0].name.split(",")[0])
            .append("img")
            .attr("src", `images/icon_${id}_0.png`);
        d3.select('#quiz_answer_1').text(data[1].name.split(",")[0])
            .append("img")
            .attr("src", `images/icon_${id}_1.png`);
    })
}

fetch('/api/questionbreakdown/' + localStorage.getItem("localQuestionId"))
    .then(response => response.json())
    .then(data => {

        const barPadding = 2;
        let dataset = [];
        let textData = ["Landbrug", "iLUC", "Forarbejdning", "Emballage", "Transport", "Detailhandel"];
        let yOffset = 10;


        dataset.push(data.data[0].agriculture);
        dataset.push(data.data[1].agriculture);
        dataset.push(data.data[0].iluc);
        dataset.push(data.data[1].iluc);
        dataset.push(data.data[0].processing);
        dataset.push(data.data[1].processing);
        dataset.push(data.data[0].packaging);
        dataset.push(data.data[1].packaging);
        dataset.push(data.data[0].transport);
        dataset.push(data.data[1].transport);
        dataset.push(data.data[0].retail);
        dataset.push(data.data[1].retail);

        console.log(dataset);

        const svg = d3.select("#emission_breakdown")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "30vh");

        maxX = d3.max(dataset, function (d) {
            return parseFloat(d);
        });

        minX = d3.min(dataset, function (d) {
            if (parseFloat(d) <= 0) {
                return parseFloat(d);
            }
            else {
                return 0;
            }
        });

        var scale = d3.scaleLinear()
            .domain([minX, maxX])
            .range([0, 100]);

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return ((100 - 5 * barPadding) / dataset.length * i + Math.floor(i / 2) * barPadding) + "%";
            })
            .attr("y", function (d) {

                return (100 - scale(0) - scale(d)) + "%";
            })
            .attr("width", ((100 - 5 * barPadding) / dataset.length) + "%")
            .attr("height", function (d) {
                return (scale((d < 0) ? -d : d)) + "%";
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
            .attr("stroke-width", 3);


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