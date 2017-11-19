
function barChart(div, dataset) {
		
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
/*		
		var svgAxeX = d3.select(div)
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

*/		
var svgAxeY = d3.select(div)
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

// CHART
		var svg = d3.select(div)
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
				.attr('stroke-width',	function(d){ 
					if(d.count == d3.max(dataset, function(d) { return d.count; }))
						return 10;})
  				.attr('stroke',function(d){ 
					if(d.count == d3.max(dataset, function(d) { return d.count; }))
						return "gold";})	
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

		var svgAxeY = d3.select(div)
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

}(window.d3);


function pieChart (div,dataset) {

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;

//var color = d3.scaleOrdinal()
//  .range(['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']);

var color = d3.scaleOrdinal(d3.schemeCategory20b);


var svg = d3.select(div)
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

var pie = d3.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var g = svg.selectAll(".arc")
      .data(pie(dataset))
      .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .attr('stroke-width',	function(d){ if(d.value == d3.max(dataset, function(d) { return d.count; }))return 5;})
      .attr('stroke',function(d){ if(d.value == d3.max(dataset, function(d) { return d.count; }))return "gold";})
      .style("fill", function(d) { return color(d.data.label); });

  g.append("text")
      .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .text(function (d) { return d.value; });


var legendRectSize = 18;
var legendSpacing = 4;

var svg2 = d3.select(div)
  .append('svg') 
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var legend = svg2.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) {return d.toUpperCase()});

}(window.d3);



