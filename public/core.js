var valueGet = angular.module('valueGet', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all values and show them
    $http.get('/api/myvalues')
        .success(function(data) {
          //collect data from the database  
          $scope.myvalues = data;
            
          //initiate variables for d3 visualization 
          var z = 0;
          var chartData = {name:'sensors', children: []};          
          
        //add sensor value to the chartData array 
          while (z < $scope.myvalues.length) {                           
                chartData.children.push({'timeStamp': z, 'value':JSON.stringify($scope.myvalues[z].SensorVal)}); //use push to place the data after the last entry
               // console.log("The array looks like: " + JSON.stringify(chartData)); //Just some debug checking
                z++;
            } 
          
          //start d3 parameter initialization 
          var vis = d3.select("#chart"),
          WIDTH = 1000,          
          HEIGHT = 500,          
          MARGINS = {
              top: 20,
              right: 20,
              bottom: 20,
              left: 50
          },  
          xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,($scope.myvalues.length-1)]), // change to dynamic ranges depending on data         
          yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([100,1000]), // same goes for the yScale         
          xAxis = d3.svg.axis()
          .scale(xScale),        
          yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");
          
          //fix xaxis to bottom
          vis.append("svg:g")
          .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
          .call(xAxis);
          
          //fix y axis to the left 
          vis.append("svg:g")
          .attr("transform", "translate(" + (MARGINS.left) + ",0)")
          .call(yAxis);
          
          //define function that draws the lines from data passed to it setting the x and y variables
          var lineGen = d3.svg.line()
          .x(function(d) {
            return xScale(d.timeStamp); //currently just index in the database TO-DO change to a real time stamp
          })
          .y(function(d) {
            return yScale(d.value);
          })
          .interpolate("basis");
          
          vis.append('svg:path')
          .attr('d', lineGen(chartData.children)) //pass your data object into here
          .attr('stroke', '#5bc0de') //style and color setting
          .attr('stroke-width', 2)
          .attr('fill', 'none');            
        })
    
        .error(function(data) {
            console.log('Error: ' + data);
        });
};