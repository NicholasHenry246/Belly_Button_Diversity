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
        var otuIDS = firstSample.otu_ids;
        var otulabels = firstSample.otu_labels;
        var sampleValues = firstSample.sample_values;
        console.log(sampleValues)
//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

     var yticks = sampleValues.slice(0, 10).reverse();
     var labels = otulabels.slice(0,10).reverse()
     var ids = otuIDS.slice(0,10).reverse().map(x => `OTU ${x.toString()}`)
      console.log(yticks)
//     // 8. Create the trace for the bar chart. 
     var barTrace = {
       
        type: "bar",
        x: yticks,
        y: ids,
        text: labels,
        //y: temps,
        orientation: "h"
      };
  
      var barData = [barTrace]
      
      
//     // 9. Create the layout for the bar chart. 
     var barLayout = {
        title: "Top 10 Bacteria Cultures Found"
     
 };

//     // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);
  
    // 1. Create the trace for the bubble chart.
    //https://plotly.com/javascript/bubble-charts/

    var trace1 = {
      x: otuIDS,
      y: sampleValues,
      text: otulabels,
      mode: 'markers',
      marker: {
      size: sampleValues,
      color: otuIDS //['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      },
    }

    var bubbleData = [trace1];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 400,
      width: 1150
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)  
   
    // 3. Create a variable that holds the washing frequency.
   
    var allMetadata = data.metadata
    var metadataFilter = allMetadata.filter(sampleObj => sampleObj.id == sample)
    var metaSample = metadataFilter[0]
    var wafreq = parseFloat(metaSample["wfreq"])
    
  //https://plotly.com/javascript/gauge-charts/

    // 4. Create the trace for the gauge chart.
    var gaugeTrace = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wafreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br></br> Scrubs Per Week"},
        gauge: {axis: {range: [null, 10], dtick: "2"},
        bar: {color: "black"},
        bgcolor: "white",
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "lightgreen"},
          {range: [8,10], color: "green"}   ]      },
        type: "indicator",
        mode: "gauge+number",
        
        
        //borderwidth: 2,
        //bordercolor: "gray",
      
        
      }
 ];
     
    var gaugeData = gaugeTrace;
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      automargin: true,
          // width: 500,
          // height: 400,
          // margin: { t: 25, r: 25, l: 25, b: 25 },
          // paper_bgcolor: "lavender",
          // font: { color: "darkblue", family: "Arial" }
};

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  
  //});
//}
  });
}; 
