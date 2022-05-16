function page_load() {
    let localAnswers = JSON.parse(localStorage.getItem('localAnswers'));
    console.log(localAnswers);
    for (let i = 1; i <= 10; i++) {

        d3.json("/api/result/" + i, {
            method: "GET"
        }).then(function (data) {

            let correctAnswer;
            let totalAnswerCount;
            let correctAnswerCount = 0;

            if (data.data[0].co2e_per_kg < data.data[1].co2e_per_kg) {
                correctAnswer = 0;
            } else {
                correctAnswer = 1;
            }

            for (let j = 0; j < data.data.length; j += 2) {
                if (data.data[j].option_chosen == correctAnswer) {
                    correctAnswerCount++;

                }
            }
            totalAnswerCount = data.data.length;

            var scale = d3.scaleLinear()
                .domain([0, totalAnswerCount])
                .range([0, 100]);


            console.log('Correct: ' + correctAnswerCount);
            console.log('Incorrect: ' + totalAnswerCount)

            d3.select("#result_comparison_container").append("div")
                .attr("id", "result_" + i + "_container")
                .attr("class", "indiv_result_container");

            d3.select("#result_" + i + "_container").append("div")
                .attr("id", "result_" + i + "_checkmark_container")
                .attr("class", "result_icon_container");

            d3.select("#result_" + i + "_container").append("div")
                .attr("id", "result_" + i + "_correct_icon_container")
                .attr("class", "result_icon_container");

            d3.select("#result_" + i + "_container").append("div")
                .attr("id", "result_" + i + "_svg_container")
                .attr("class", "result_svg_container");

            d3.select("#result_" + i + "_container").append("div")
                .attr("id", "result_" + i + "_incorrect_icon_container")
                .attr("class", "result_icon_container");

            const svg = d3.select("#result_" + i + "_svg_container").append("svg")
                .attr("id", "svg_" + i);

            if (correctAnswer == parseInt(localAnswers[i - 1])) {
                d3.select("#result_" + i + "_checkmark_container").append("img")
                    .attr("src", "images/checkmark.png");
            }
            else {
                d3.select("#result_" + i + "_container")
                    .style("opacity", "50%");
            }

            d3.select("#result_" + i + "_correct_icon_container").append("img")
                .attr("src", `images/icon_${i}_${correctAnswer}.png`);

            d3.select("#result_" + i + "_incorrect_icon_container").append("img")
                .attr("src", `images/icon_${i}_${1 - correctAnswer}.png`);

            svg.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', "100%")
                .attr('height', 35)
                .attr('fill', '#44444422    ');

            svg.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', scale(correctAnswerCount) + "%")
                .attr('height', 35)
                .attr('fill', '#90DA50');

        })
    }
}