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
                .attr("height", "100%");

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
                .domain([minX, maxX])
                .range([0, 100]);

            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("id", function (d, i) {
                    return `emission_category_${Math.floor(i / 2)}`;
                })
                .attr("x", function (d, i) {
                    return ((100 - 5 * barPadding) / dataset.length * i + Math.floor(i / 2) * barPadding) + "%";
                })
                .attr("y", function (d) {

                    return (100 - scale(0) - scale((d < 0) ? d : d + minX)) + "%";
                })
                .attr("width", ((100 - 5 * barPadding) / dataset.length) + "%")
                .attr("height", function (d) {
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
                .attr("stroke-width", (minX < 0) ? 1 : 2);

            d3.json("/api/emission_category/", {
                method: "GET"
            }).then(function (response) {
                const emissionCategories = response.data;
                console.log(emissionCategories.length);
                emissionCategories.forEach(emission_category => {

                    let barId = "";
                    switch (emission_category.category.toLowerCase()) {
                        case 'agriculture':
                            barId = "emission_category_0";
                            break;
                        case 'iluc':
                            barId = "emission_category_1";
                            break;
                        case 'processing':
                            barId = "emission_category_2";
                            break;
                        case 'packaging':
                            barId = "emission_category_3";
                            break;
                        case 'transport':
                            barId = "emission_category_4";
                            break;
                        case 'retail':
                            barId = "emission_category_5";
                            break;
                        default:
                            break;
                    }
                    console.log(emission_category.category.toLowerCase());
                    d3.selectAll("#" + barId)
                        .on("mouseover", function () {
                            let iconElement = document.getElementById(emission_category.danish_category.toLowerCase() + "_icon").getBoundingClientRect();

                            let xPosition = 0;

                            if (parseInt(emission_category.category_id) < 4) {
                                xPosition = iconElement.x + iconElement.width;
                            } else {
                                xPosition = iconElement.x - (45 * window.innerWidth / 100) - 5;
                            }

                            let yPosition = document.getElementById("emission_breakdown").getBoundingClientRect().top;

                            d3.select("#tooltip")
                                .style("left", xPosition + "px")
                                .style("top", yPosition + "px")
                                .select("h2")
                                .text(`${emission_category.danish_category}`);

                            d3.select("#tooltip_answer_0")
                                .text(`${data.data[0].name.split(",")[0]}: ${parseFloat(data.data[0][emission_category.category.toLowerCase()]).toFixed(2)}`);

                            d3.select("#tooltip_answer_1")
                                .text(`${data.data[1].name.split(",")[0]}: ${parseFloat(data.data[1][emission_category.category.toLowerCase()]).toFixed(2)}`);

                            d3.select("#tooltip")
                                .select("p")
                                .text(`${emission_category.description}`);

                            d3.select("#" + emission_category.danish_category.toLowerCase() + "_icon")
                                .style("transform", "scale(1.10)")
                                .style("cursor", "pointer");

                            d3.select("#tooltip").classed("hidden", false);
                        })
                        .on("mouseout", function () {
                            d3.select("#tooltip").classed("hidden", true);

                            d3.select("#" + emission_category.danish_category.toLowerCase() + "_icon")
                                .style("transform", "scale(1.0)")
                                .style("cursor", "default");
                        });

                    d3.select(`#${emission_category.danish_category.toLowerCase()}_icon`)
                        .append("img")
                        .attr("src", `images/icon_${emission_category.danish_category.toLowerCase()}.png`)
                        .on("mouseover", function () {

                            let iconElement = document.getElementById(emission_category.danish_category.toLowerCase() + "_icon").getBoundingClientRect();

                            let xPosition = 0;

                            if (parseInt(emission_category.category_id) < 4) {
                                xPosition = iconElement.x + iconElement.width;
                            } else {
                                xPosition = iconElement.x - (45 * window.innerWidth / 100) - 5;
                            }

                            let yPosition = document.getElementById("emission_breakdown").getBoundingClientRect().top;

                            d3.select("#tooltip")
                                .style("left", xPosition + "px")
                                .style("top", yPosition + "px")
                                .select("h2")
                                .text(`${emission_category.danish_category}`);

                            d3.select("#tooltip_answer_0")
                                .text(`${data.data[0].name.split(",")[0]}: ${parseFloat(data.data[0][emission_category.category.toLowerCase()]).toFixed(2)}`);

                            d3.select("#tooltip_answer_1")
                                .text(`${data.data[1].name.split(",")[0]}: ${parseFloat(data.data[1][emission_category.category.toLowerCase()]).toFixed(2)}`);

                            d3.select("#tooltip")
                                .select("p")
                                .text(`${emission_category.description}`);

                            d3.select("#" + emission_category.danish_category.toLowerCase() + "_icon")
                                .style("transform", "scale(1.10)")
                                .style("cursor", "pointer");

                            d3.select("#tooltip").classed("hidden", false);
                        })
                        .on("mouseout", function () {
                            d3.select("#tooltip").classed("hidden", true);

                            d3.select("#" + emission_category.danish_category.toLowerCase() + "_icon")
                                .style("transform", "scale(1.0)")
                                .style("cursor", "default");
                        });
                });
            });
        });
}