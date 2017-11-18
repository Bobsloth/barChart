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

var width = 220;
var height = 220;
var radius = Math.min(width, height) / 2;

//var color = d3.scaleOrdinal()
//  .range(['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']);

var color = d3.scaleOrdinal(d3.schemeCategory20b);

/*
var color = d3.scaleLinear().domain([1,dataset.length])
		      .interpolate(d3.interpolateHcl)
		      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);
*/
var svg = d3.select('#chart2')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

var labelArc = d3.arc()
	.outerRadius(radius - 40)
	.innerRadius(radius - 40);

var pie = d3.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d) {
  	return color(d.data.label);
   });

/*
path.append("text")
  .text(function(d){return d.count;})
  .attr("transform", function(d) {
                d.innerRadius = 0;
                d.outerRadius = radius;
		console.log(arc.centroid(d));
                return "translate(" + arc.centroid(d) + ")";
            })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "black")
  .attr("text-anchor", "middle");*/	

path.append("text")
	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	.text(function(d) { return d.label;})	
	.style("fill", "black");

var legendRectSize = 18;
var legendSpacing = 4;
var svg2 = d3.select('#chart2')
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
  .text(function(d) { return d.toUpperCase()});

})(window.d3);


