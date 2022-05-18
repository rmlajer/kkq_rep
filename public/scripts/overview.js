function page_load() {
    d3.json("/api/overview", {
        method: "GET"
    }).then(function (response) {
        const data = response.data;
        console.log(response.data);

        offsetX = 5;
        offsetY = 5;

        maxX = d3.max(data, function (d) { return parseFloat(d.co2e_per_kg); });
        maxY = d3.max(data, function (d) { return parseFloat(d.energy); });



        console.log(maxX + " - " + maxY);
        // Create SVG element
        const svg = d3.select("#overview_chart")
            .append("svg")
            .attr("id", "overview_svg")
            .attr("width", "700px")
            .attr("height", "400px");

        const scaleX = d3.scaleLinear()
            .domain([0, maxX])
            .range([0, 100 - offsetX * 2]);

        const scaleY = d3.scaleLinear()
            .domain([0, maxY])
            .range([100 - offsetY * 2, 0]);

        let axisX = d3.axisBottom(scaleX)
            .tickPadding(10)
            .tickSize(10);
/*
        svg.append("g")
            .attr("id", "axisX")
            .attr("transform", `translate(5%, 95%)`);

        svg.select("#axisX")
            .call(axisX);
*/
        // Lave scatter plot (punktdiagram)
        svg.selectAll("circle") // <-- Før var det 'rect'
            .data(data)
            .enter()
            .append("circle") // <-- Før var det 'rect'
            .attr("cx", function (d) {
                //console.log(d.co2e_per_kg);
                return (scaleX(parseFloat(d.co2e_per_kg)) + offsetX) + "%"; // Første værdi i indre array (x)
            })
            .attr("cy", function (d) {
                //console.log(d.energy);
                return (scaleY(parseFloat(d.energy)) + offsetY) + "%"; // Anden værdi i indre array (y)
            })
            .attr("id", function (d) {
                return `point_${d.food_id}`;
            })
            .attr("fill", "black")
            .attr("r", 3); // Radius er en konstant på '5'
    });
}