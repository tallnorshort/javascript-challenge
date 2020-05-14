// from data2.js This is calling the shell data we created in our prior JS code. But now we are placing it in a new variable
var tableData = data;

// function to display UFO sightings
//A JavaScript function is a block of code designed to perform a particular task.
//The code inside a JavaScript function will execute when "something" invokes it.
//The code inside a function is not executed when the function is defined.
//
function tableDisplay(ufoSightings) {  //creating a 'function' named tableDisplay. The parentheses may include parameter names(in this case ufoSightings), seperated by a ","
  var tbody = d3.select("tbody"); //D3 selections allow DOM elements(such as 'DIV, HTML, BODY' element on a page) to be selected in order to do something with them, 
                                  //be it changing style, modifying their attributes, performing data-joins or inserting/removing elements.
  ufoSightings.forEach((ufoRecord) => {  //Javascript 'forEach()' is an Array method that we can use to execute a function on each item in an array.
                                        //In this case, we are making a new parameter or 'arguement', so we can execute the function. This parameter is 'ufoRecord'. 
    var row = tbody.append("tr");        //The DOM Node interface is a key base class upon which many other DOM API objects are based,
                                      //thus letting those object types to be used similarly and often interchangeably.
    Object.entries(ufoRecord).forEach(([key, value]) => {  //The 'Object.entries()' method returns an array of a given object's own enumerable 
                                                          // string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop.
      var cell = row.append("td");    //Same as above but now we are setting an '.append' command for the 'td' node. This is for the table data in the html code
      cell.html(value);               //This allows our html code to grab our newly formed 'value' pairing key we created by calling it in ()              
    });
  });
};  //end of function. There are 2 parameter, 3 variables, 1 d3.select method, 2 'foreach' commands, allows us to display data.js in an html table. 

// clear the table for new data
function deleteTbody() {  //new function, this time to clear the table data when we are filtering, our parameter will be 'deleteTbody'
  d3.select("tbody") //telling the function to select tbody html node
    .selectAll("tr").remove() //remove tr tag
    .selectAll("td").remove();  //remove td tag
};
//This will be important once we start filtering data 

  
// initial display of all UFO sightings
console.log(tableData); //prints tabledata variable array to 'console'
tableDisplay(tableData); //dispalys variable table data using the tableDisplay function we created upbove 

// 'Filter Table' button
var button = d3.select("#filter-btn"); //This is a selection variable we are creating for the filter table. This can be called from the html code because of the '#'

// filter the database
button.on("click", function(event) {   //The on() method attaches one or more event handlers for the selected elements and child elements.
  
  d3.event.preventDefault();  //Event object to access standard event fields such as timestamp or methods like preventDefault
  deleteTbody(); //The Event interface's preventDefault() method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be. 
                //the event continues to propagate as usual,unless one of its event listeners calls stopPropagation() or stopImmediatePropagation(), either of which terminates propagation at once.
                //In this preventDefault command, it will be used for 'deleteTbody()' function we made above. 
  
  
  
  var filteredData = tableData; //Creating a variable to recall 'tabledata' 
  var inputId = document.getElementsByClassName("control");  //The 'getElementsByClassName' method of Document interface returns an array-like object 
                                                                  //of all child elements which have all of the given class name(s).This class name can be recalled
                                                                  //in this example, it is called 'control', and is recalled in the html code. 
  
  // iterate through all the input fields
  for (var i = 0; i < inputId.length; i++) {  //'for loop' in javascript. Explained: i is the variable representative for looping through our 'inputID'
                                              // i loop is less than the inputID.lengh (Which creates a string for the inputID was created). Finally;
                                              // the last sytnax; i++ means to In the last command (i++), we increment value of the i variable by 1. 
	
	var idName = inputId[i].id; //this is a variable of our iternation for inputID
	var field = d3.select("#" + idName).property("value"); //creating a variable to select our table data once it has been filter. '.property' 
  // An object is a collection of properties, and a property is an association between name (or key) and a value. A property's value can be a function treat empty or space-only fields as a search for ALL for that field
	if (field.trim() !== "") {  //This is trimming all the whitespace and to 
	  var filteredData = filteredData.filter(ufoSighting => 
	    // match as case insensitive
		ufoSighting[idName].toUpperCase().trim() ===
		field.toUpperCase().trim());
	};
  };
 
  // display message if no records found
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h1>This is most likely because of a government cover up! You should believe me because I built this webpage but in this case we have NO RECORDS!</h1>");
  };
  
  // display the database
  console.log(filteredData);
  tableDisplay(filteredData);
});