function page_load() {
  console.log("creating svg..");
  //d3.select("#result_comparison_container").append("div").attr("id", "result_" + 1);

  let localAnswers = JSON.parse(localStorage.getItem('localAnswers'));
  console.log(localAnswers);
  for (let i = 1; i <= 10; i++) {

    d3.json("/api/result/" + i, {
      method: "GET"
    }).then(function (data) {

      let correctAnswer;
      let incorrectAnswerCount;
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
      incorrectAnswerCount = data.data.length / 2 - correctAnswerCount;
      console.log('Correct: ' + correctAnswerCount);
      console.log('Incorrect: ' + incorrectAnswerCount)


      d3.select("#result_comparison_container").append("div")
        .attr("id", "result_" + i);

      if (correctAnswer == parseInt(localAnswers[i - 1])) {
        d3.select("#result_" + i).append("img")
          .attr("src", "images/checkmark.png")
          .style("width", "35px")
          .style("height", "35px");
      }
      else {
        d3.select("#result_" + i).append("img")
          .attr("src", "images/empty_square.png")
          .style("width", "35px")
          .style("height", "35px");
        d3.select("#result_" + i)
          .style("opacity", "50%");
      }
      d3.select("#result_" + i).append("img")
        .attr("src", `images/icon_${i}_0.png`)
        .style("width", "35px")
        .style("height", "35px");

      const svg = d3.select("#result_" + i).append("svg")
        .attr("id", "svg_" + i)
        .style("width", "calc(100% - 115px)")
        .style("height", "35px")
        .style("display", "inline");


      /* var scale = d3.scaleLinear()
        .domain([0, correctAnswerCount + incorrectAnswerCount])
        .range([0, d3.select("#svg_" + i)
          .node().getBoundingClientRect().width]);
      */

      var scale = d3.scaleLinear()
        .domain([0, correctAnswerCount + incorrectAnswerCount])
        .range([0, 100]);



      svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', "100%")
        .attr('height', 35)
        .attr('fill', '#69a3b2');

      svg.append('rect')
        .attr('x', scale(correctAnswerCount) + "%")
        .attr('y', 0)
        .attr('width', scale(incorrectAnswerCount) + "%")
        .attr('height', 35)
        .attr('fill', '#f98a2f');


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
    })
  }
}