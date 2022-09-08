function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data)
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
 

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
//   // 2. Use d3.json to load and retrieve the samples.json file 
 d3.json("samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 
        var samplesArray = data.samples
//     // 4. Create a variable that filters the samples for the object with the desired sample number.
        var filterSamples = samplesArray.filter(sampleObj => sampleObj.id == sample);
//     // 5. Create a variable that holds the first sample in the array.

        var firstSample = filterSamples[0]
//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otuIDS = firstSample.otu_ids
        var otulabels = firstSample.otu_labels
        var sampleValues = firstSample.sample_values
        console.log(sampleValues)
//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

     var yticks = sampleValues.slice(0, 10).reverse();
     var labels = otulabels.slice(0,10).reverse()
     var ids = otuIDS.slice(0,10).reverse()
      console.log(yticks)
//     // 8. Create the trace for the bar chart. 
     var barTrace = {
       
        type: "bar",
        x: yticks,
        y: labels,
        text: ids,
        //y: temps,
        orientation: "h"
      };
  
      var barData = [barTrace]
      
      
//     // 9. Create the layout for the bar chart. 
     var barLayout = {
        
     
     };
//     // 10. Use Plotly to plot the data with the layout. 
     Plotly.newPlot("bar", barData, barLayout)
  });
 }

 // Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)

    // 1. Create the trace for the bubble chart.
    //https://plotly.com/javascript/bubble-charts/

    var trace1 = {
      x: otuIDS,
      y: sample_values,
      text: otulabels,
      mode: 'markers',
      marker: {
      size: [40, 60, 80, 100]
      }
    }

    var bubbleData = [trace1];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot(); 
  });
}
