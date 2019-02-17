var svgHeight = 600,
    svgWidth = 900,
    margin = {top: 40, right: 20, bottom: 40, left: 40},
    height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right
    chart_data = [];

var xScale = d3.scaleBand().rangeRound([0,width]).padding(0.3),
    xAxis = d3.axisBottom().scale(xScale).ticks(3),
    yValue = function(data) { return data.value; },
    yScale = d3.scaleLinear().range([height, 0]),
    yAxis = d3.axisLeft().scale(yScale).ticks(10);

var svg = d3.select('.chart')
            .attr('height', svgHeight)
            .attr('width', svgWidth).append('g')
                .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

svg.append('g')
    .attr('class','xaxis')
    .attr('transform','translate(0,' + height + ')');

svg.append('g')
    .attr('class','yaxis');

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

    // update the domains
    xScale.domain(lengths.map(function(data) { return data.key; }));
    yScale.domain([0, d3.max(data, function(data) { return data.petal_length; })]);

    svg.select('.xaxis').call(xAxis);
    svg.select('.yaxis').call(yAxis);

    var selection = svg.selectAll('.bar')
        .data(lengths)
        .attr('class','bar')
        .attr('x', function(d) { return xScale(d.key); })
        .attr('y', function(d) { return yScale(d.value); })
        .attr('width', xScale.bandwidth())
        .attr('height', function(d) { return height - yScale(d.value); })
        .attr('fill','#D9D9D9');
    
    
    //enter
    selection.enter().append('rect')
        .attr('class','bar')
        .attr('x', function(d) { return xScale(d.key); })
        .attr('y', function(d) { return yScale(d.value); })
        .attr('width', xScale.bandwidth())
        .attr('height', function(d) { return height - yScale(d.value); })
        .attr('fill','#D9D9D9');


    //enter

    svg.selectAll('.dot')
        .data(data).enter().append('circle')
        .attr('class','dot')
        .attr('cx', function(d) { return xScale(d.species) + (xScale.bandwidth()/2); })
        .attr('cy', function(d) { return yScale(d.petal_length);})
        .attr('fill','steelblue')
        .attr('r', 5);

    //exit
    selection.exit().remove();
    return 1;
}