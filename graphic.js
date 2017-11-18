
            	/*var dataset = [];
		for (var i = 0; i < 10; i++) {          
		    var newNumber = Math.floor(Math.random() * 30); 
		    dataset.push(newNumber);             
		}*/
(function(d3) {
		var dataset = [
		  { id: 0, label: 'Jacques Chirac', count: 2 },
		  { id: 12, label: 'Eric Cartman', count: 40 },
		  { id: 23, label: 'Obi-Wan Kenobi', count: 30 },
		  { id: 3, label: 'Dijkstra', count: 20 },
		  { id: 14, label: 'Mr.Spock', count: 35 },
		  { id: 8, label: 'Elrond', count: 30 },
		  { id: 6, label: 'Luigi', count: 20 } 	
		];
		
		for(var i = 0; i < dataset.length; i++){
			dataset[i].id = i;
		}

		var widthSVG = 600;
		var heightSVG = 100; 
		var widthAxeX = widthSVG;
		var heightAxeX = 20;  
		var widthAxeY = 30;
		var heightAxeY = heightSVG; 
		var barPadding = 2;	 
		var widthBar = widthSVG / dataset.length - barPadding;
		var heightBar = heightSVG; 
				
                   
// AXIS X
		
		var svgAxeX = d3.select("#chart")
					.append("svg")
					.attr("width", widthAxeX)
					.attr("height", heightAxeX);
		var xScale = d3.scaleLinear()
				     .domain([0, dataset.length])
				     .range([0, widthSVG-1]);
				
		var xAxis = d3.axisBottom()
				  .scale(xScale);


		var xAxisGroup = svgAxeX.append("g")
				    .attr("class", "axis")
				    .attr("transform", "translate(0," +  barPadding + ")")
				    .call(xAxis);

		


// CHART
		var svg = d3.select("#chart")
			.append("svg")
			.attr("width", widthSVG)
			.attr("height", heightSVG);

		var heightScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d.count; })])
                     .range([0, heightSVG]);

		var color = d3.scaleLinear().domain([1,dataset.length])
		      .interpolate(d3.interpolateHcl)
		      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);


		var graph = svg.selectAll("rect")
			    .data(dataset)
			    .enter()
			    .append("rect")
				.attr("x",function(d, i){return i*(widthSVG/dataset.length);})
			       	//.attr("y", function(d){return heightBar - d*3;})
				.attr("y", function(d){return heightBar - heightScale(d.count);})
				.attr("width", widthBar)
   				.attr("height", heightBar)
				.attr('fill', function(d) {
  					return color(d.id);});


		svg.selectAll("text")
			   	.data(dataset)
			   	.enter()
				.append("text")
				.text(function(d){return d.label;})
				.attr("x",function(d, i){return i*(widthSVG/dataset.length ) + widthBar/2;}) 
				.attr("y", function(d){
					if((heightBar - d.count*3) < (heightBar - 12)){
						return heightBar - heightScale(d.count) + 12;
						
					}
					else{
						return heightBar - heightScale(d.count) - 2 ;
					}})
				.attr("font-family", "sans-serif")
				.attr("font-size", "11px")
				.attr("fill", "black")
				.attr("text-anchor", "middle");	





// AXIS Y

		var svgAxeY = d3.select("#chart")
					.append("svg")
					.attr("width", widthAxeY)
					.attr("height", heightAxeY);

		var yScale = d3.scaleLinear()
				     .domain([0, d3.max(dataset, function(d) { return d.count; })])
				     .range([ heightSVG,0]);

		var yAxis = d3.axisRight()
				  .scale(yScale)
				  .ticks(5);

		var yAxisGroup = svgAxeY.append("g")
				    .attr("class", "axis")
				    .attr("transform", "translate(" +  barPadding + ")",0)
				    .call(yAxis);

})(window.d3);

