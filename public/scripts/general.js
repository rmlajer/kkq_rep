function test() {
    console.log("test");
}

//Simple log check for localQuestionCounter.
function check_question_id() {
    console.log("localQuestionId: " + localStorage.getItem('localQuestionId'));
    console.log("localAnswers: " + localStorage.getItem('localAnswers'));
}

function show_infobox(event) {

    console.log("Event: " + event);

    // Læs søjlens x og y position ud fra 'this'
    // Husk parseFloat for at lave text til number.
    const xPosition = parseFloat(d3.select(this).attr("x"));
    const yPosition = parseFloat(d3.select(this).attr("y")) + 10;

    // Flyt tooltip div til rigtig position
    d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#value")
        .text("test");

    // Vis tooltip på ny position
    d3.select("#tooltip").classed("hidden", false);
}

function hide_infobox() {
    d3.select("#tooltip").classed("hidden", true);
}

