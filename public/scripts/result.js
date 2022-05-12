function page_load() {
    console.log("creating svg..");
    //d3.select("#result_comparison_container").append("div").attr("id", "result_" + 1);

    for (let i = 1; i <= 10; i++) {
        d3.select("#result_comparison_container").append("div")
            .attr("id", "result_" + i);

        d3.select("#result_" + i).append("img")
            .attr("src", "images/information-button.png")
            .style("width", "35px")
            .style("height", "35px");
        d3.select("#result_" + i).append("img")
            .attr("src", `images/icon_${i}_0.png`)
            .style("width", "35px")
            .style("height", "35px");



        const svg = d3.select("#result_" + i).append("svg")
            .attr("id", "svg_" + i)
            .style("width", "calc(100% - 110px)")
            .style("height", "35px")
            .style("display", "inline");
        
        svg.append('rect')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 100)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('fill', '#69a3b2');

      // Lav SVG-elementet
      /*const svg = d3.select("body")
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
          return h - (d / 5);
        })
        // Bredden er fast - og afhænger af 'w' og antallet af datapunkter
        .attr("width", w / dataset.length - barPadding) // Padding skaber luft imellem søjler
        // Højden er datapunktet * 4. 
        .attr("height", function (d) {
          return d * 4;
        })
        // Alle søjler er farvet 'teal'
        .attr("fill", "teal");

*/


        d3.select("#result_" + i).append("img")
            .attr("src", `images/icon_${i}_1.png`)
            .style("width", "35px")
            .style("height", "35px");
    }
}