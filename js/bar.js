var svgHeight = 600,
    svgWidth = 900,
    margin = {top: 40, right: 20, bottom: 40, left: 40},
    height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right;

var svg = d3.select('.chart')
            .attr('height', svgHeight)
            .attr('width', svgWidth).append('g')
                .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

d3.csv('http://localhost:8000/iris.csv', function (d,i) { 
    return { row: i,
            species: d.species,
            length: +d.petal_length};
})
.then(function(data) { 
    

    
})
.catch(function(err) { console.log(err)});