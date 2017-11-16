
            	var dataset = [];
		for (var i = 0; i < 25; i++) {           // Itère 25 fois
		    var newNumber = Math.floor(Math.random() * 30);  // Nouveau nombre aléatoire (0-30)
		    dataset.push(newNumber);             // Ajoute le nouveau nombre au tableau
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
				
                     // Crée un tableau vide
		
var svgAxeX = d3.select("body")
			.append("svg")
			.attr("width", widthAxeX)
			.attr("height", heightAxeX);
var xScale = d3.scale.linear()
                     .domain([0, dataset.length])
                     .range([0, widthSVG-1]);
		
var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");


var xAxisGroup = svgAxeX.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(0," +  barPadding + ")")
		    .call(xAxis);

		

		var svg = d3.select("body")
			.append("svg")
			.attr("width", widthSVG)
			.attr("height", heightSVG);

		var heightScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d; })])
                     .range([0, heightSVG]);


		var graph = svg.selectAll("rect")
			    .data(dataset)
			    .enter()
			    .append("rect")
				.attr("x",function(d, i){return i*(widthSVG/dataset.length);})
			       	//.attr("y", function(d){return heightBar - d*3;})
				.attr("y", function(d){return heightBar - heightScale(d);})
				.attr("width", widthBar)
   				.attr("height", heightBar)
				.attr("fill",function(d){
					if (d < 10){
						return "green"; 
					}
					if (d >= 10 && d <=20){
						return "orange"; 
					}
					if (d > 20){
						return "red"; 
					}		
				});

		svg.selectAll("text")
			   	.data(dataset)
			   	.enter()
				.append("text")
				.text(function(d){return d;})
				.attr("x",function(d, i){return i*(widthSVG/dataset.length ) + widthBar/2;}) 
				.attr("y", function(d){
					if((heightBar - d*3) < (heightBar - 12)){
						return heightBar - heightScale(d) + 12;
						
					}
					else{
						return heightBar - heightScale(d) - 2 ;
					}})
				.attr("font-family", "sans-serif")
				.attr("font-size", "11px")
				.attr("fill", "black")
				.attr("text-anchor", "middle");	







var svgAxeY = d3.select("body")
			.append("svg")
			.attr("width", widthAxeY)
			.attr("height", heightAxeY);

var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset)])
                     .range([ heightSVG,0]);

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
		  .ticks(5);

var yAxisGroup = svgAxeY.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" +  barPadding + ")",0)
		    .call(yAxis);




/*
		d3.select("body").selectAll("div")
			    .data(dataset)
			    .enter()
			    .append("div")
			    .attr("class", "bar")
				.style("height", function(d){
					var barHeight = d * 5;	
					return barHeight + "px";})
				.style("background-color", function(d){
					if (d < 10){
						return "green"; 
					}
					if (d >= 10 && d <=20){
						return "orange"; 
					}
					if (d > 20){
						return "red"; 
					}		
				});
		*/
		/*var cicles = svg.selectAll("rect")
			    .data(dataset)
			    .enter()
			    .append("rect")
				.attr("cx", function(d, i) {
				    return (i * 50) + 25;
				})
			       .attr("cy", height/2)
			       .attr("r", function(d) {
				    return d;
			       })
				.attr("fill",function(d){
					if (d < 10){
						return "green"; 
					}
					if (d >= 10 && d <=20){
						return "orange"; 
					}
					if (d > 20){
						return "red"; 
					}		
				});
		/*d3.select("body")
			.selectAll("p")
			.data(dataset)
			.enter()
			.append("p")
			.text(function(d){return d;})
			.style("color", function(d){
				if (d < 15){
					return "green"; 
				}
				if (d >= 15 && d <=20){
					return "orange"; 
				}
				if (d > 20){
					return "red"; 
				}		
			});*/

