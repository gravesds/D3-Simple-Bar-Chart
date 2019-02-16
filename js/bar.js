var svgHeight = 600,
    svgWidth = 900,
    margin = {top: 40, right: 20, bottom: 40, left: 40},
    height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right
    chart_data = [];

var svg = d3.select('.chart')
            .attr('height', svgHeight)
            .attr('width', svgWidth).append('g')
                .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

d3.csv('http://localhost:8000/iris.csv', function (d,i) { 
    return { row: i,
            species: d.species,
            petal_length: +d.petal_length};
})
.then(function(data) { 
    chart_data = data;
    update(chart_data);
}).catch(function(err) { console.log(err)});

var update = function(data) {
    console.log('running update data');
    console.log(data.length);
    var lengths = d3.nest()
                    .key(function(d) { return d.species; })
                    .rollup(function(v) { return d3.mean( v, function(d) { return d.petal_length})})
                    .entries(data);

    console.log(lengths);
    console.log(speciesPetalLength);




    return 1;
}