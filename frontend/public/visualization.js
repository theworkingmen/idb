
/*
 * D3 js to visualize the congressional districts in the US.
 * Most of the code was adopted from Mike Bostock.
 * The code is under GNU General Public License, version 3 License.
 * We have added code to classify the districts based on the party controlling the district.
 * We have also added code to color the districts based on party colors (blue, red).
 */
var width = 1500,
    height = 700;

var projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "us.json")
    .defer(d3.json, "democrats.json")
    .defer(d3.json, "republicans.json")
    .await(ready);

function ready(error, us, democrats, republicans) {
    if (error) throw error;

    svg.append("defs").append("path")
        .attr("id", "land")
        .datum(topojson.feature(us, us.objects.land))
        .attr("d", path);

    svg.append("clipPath")
        .attr("id", "clip-land")
        .append("use")
        .attr("xlink:href", "#land");

    svg.append("g")
        .attr("class", "democrats-1")
        .attr("clip-path", "url(#clip-land)")
        .selectAll("path")
        .data(topojson.feature(democrats, democrats.objects.districts).features)
        .enter().append("path")
        .attr("d", path)
        .append("title")
        .text(function(d) {
            return d.id;
        });

    svg.append("path")
        .attr("class", "district-boundaries")
        .datum(topojson.mesh(democrats, democrats.objects.districts,
            function(a, b) {
                return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0);
            }))
        .attr("d", path);

    svg.append("g")
        .attr("class", "republicans-1")
        .attr("clip-path", "url(#clip-land)")
        .selectAll("path")
        .data(topojson.feature(republicans, republicans.objects.districts).features)
        .enter().append("path")
        .attr("d", path)
        .append("title")
        .text(function(d) {
            return d.id;
        });

    svg.append("path")
        .attr("class", "district-boundaries")
        .datum(topojson.mesh(republicans, republicans.objects.districts,
            function(a, b) {
                return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0);
            }))
        .attr("d", path);

    svg.append("path")
        .attr("class", "state-boundaries")
        .datum(topojson.mesh(us, us.objects.states,
            function(a, b) {
                return a !== b;
            }))
        .attr("d", path);
}

d3.select(self.frameElement).style("height", height + "px");
