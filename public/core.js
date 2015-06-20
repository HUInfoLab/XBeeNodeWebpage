var valueGet = angular.module('valueGet', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all values and show them
    $http.get('/api/myvalues')
        .success(function(data) {
          //collect data from the database  
          $scope.myvalues = data;
         
          //test out date formats
          var format = d3.time.format("%X");
          
          //initiate variables for d3 visualization 
          var z = 0;
          var count1 = 0;
          var count2 = 0;
          var chartData1 = {name:'sensors', children: []};          
          var chartData2 = {name:'sensors', children: []};
          var y_axis = 0;
          
          //add sensor value to the chartData array           
          while (z < $scope.myvalues.length) { 
                if ($scope.myvalues[z].SensorID == "1111") {
                    //use push to place the data after the last entry
<<<<<<< HEAD
                    chartData1.children.push({'date': format.parse($scope.myvalues[z].SensorTime), 'timeStamp': count1, 'value':JSON.stringify($scope.myvalues[z].SensorVal)});   
=======
                    chartData1.children.push({'timeStamp': (count1/12), 'value':JSON.stringify($scope.myvalues[z].SensorVal)});   
>>>>>>> 666eceec6b960f3417df5b88aa01be1ac266589e
                    //console.log("The array looks like: " + JSON.stringify(chartData)); //Just some debug checking
                    count1++; //unique index temporarily replacing timestamp, also allows individual node iteration
                   //console.log("the sensor timestamp is: " +format.parse($scope.myvalues[z].SensorTime));
                }
                else if ($scope.myvalues[z].SensorID == "2222"){
<<<<<<< HEAD
                    chartData2.children.push({'date': format.parse($scope.myvalues[z].SensorTime),'timeStamp': count2, 'value':JSON.stringify($scope.myvalues[z].SensorVal)}); 
=======
                    chartData2.children.push({'timeStamp': (count2/12), 'value':JSON.stringify($scope.myvalues[z].SensorVal)}); 
>>>>>>> 666eceec6b960f3417df5b88aa01be1ac266589e
                    count2++
                }
                else {
                    break;
                }
                if ($scope.myvalues[z].SensorVal > y_axis) {
                    y_axis = $scope.myvalues[z].SensorVal;
                }
                z++
          }
          
          //set x axis range
          var x_axis = 0;
          if (count2 > count1) {
              x_axis = (count2/12);   
          }
          else {
              x_axis = (count1/12);
          }
          
          //set y axis range
          y_axis = y_axis - (y_axis%100) + 100;
<<<<<<< HEAD
        
        
          //start d3 parameter initialization 
          var vis = d3.select("#chart"),
          WIDTH = 1000,          
          HEIGHT = 500,          
=======
        
          //start d3 parameter initialization 
          var vis = d3.select("#chart"),
          WIDTH = 1200,          
          HEIGHT = 600,          
>>>>>>> 666eceec6b960f3417df5b88aa01be1ac266589e
          MARGINS = {
              top: 20,
              right: 20,
              bottom: 20,
              left: 60
          },  
<<<<<<< HEAD
          xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([(new Date(chartData1.children[0].date)), (new Date(chartData1.children[6].date))]),
          yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([700,y_axis]), 
=======
          xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,(x_axis+(x_axis/10))]),
          yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([500,y_axis]), 
>>>>>>> 666eceec6b960f3417df5b88aa01be1ac266589e
              
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
            return xScale(d.date); //currently just index in the database TO-DO change to a real time stamp
          })
          .y(function(d) {
            return yScale(d.value);
          })
          .interpolate("basis");
          
          //Sensor ID #1
          vis.append('svg:path')
          .attr('d', lineGen(chartData1.children)) //pass your data object into here
          .attr('stroke', '#3070ff') //style and color setting
          .attr('stroke-width', 2)
          .attr('fill', 'none');  
          //Sensor ID #2
          vis.append('svg:path')
          .attr('d', lineGen(chartData2.children)) //pass your data object into here
          .attr('stroke', 'red') //style and color setting
          .attr('stroke-width', 2)
          .attr('fill', 'none');        
        })
    
        .error(function(data) {
            console.log('Error: ' + data);
        });
};