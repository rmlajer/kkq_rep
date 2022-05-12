function page_load() {
    check_question_id();
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


fetch('/api/questionbreakdown/' + localStorage.getItem("localQuestionId"))
    .then(response => response.json())
    .then(data => {

        console.log(data)

        let dataset = [];

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


        const w = 500;
        const h = 300;
        const multiplier = 300;
        const barPadding = 1; // Bruges til at lave afstand imellem søjler

        const svg = d3.select("#emission_breakdown")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Lave barchart (søjlediagram)
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            // 'd' er datapunktet
            // 'i' er index i datasættet
            .attr("x", function (d, i) {
                // Søjlerne spredes jævnt ud over 'w'
                return i * (w / dataset.length);
            })
            .attr("y", function (d) {
                // 'y' er position for søjlens øverste kant
                // Husk, y-aksen vender på hovedet!
                return h - (d * multiplier);
            })
            // Bredden er fast - og afhænger af 'w' og antallet af datapunkter
            .attr("width", w / dataset.length - barPadding) // Padding skaber luft imellem søjler
            // Højden er datapunktet * 4. 
            .attr("height", function (d) {
                return d * multiplier;
            })
            // Alle søjler er farvet 'teal'
            .attr("fill", "teal");




    });
