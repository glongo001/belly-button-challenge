//first save the data from url as constant
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

//1. use d3 to load dataset
//call init function to initialize the dropdown menu and the charts
d3.json(url).then(init, function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});

//create dropdown menu to pick sample
function init(data) {
    //select dropdown menu with d3
    let dropdownMenu = d3.select('#selDataset');
    //create variable for patient names
    let samples = data.names;
    //add each name to the dropdown menu
    samples.forEach((id) => {
        //log each id for all iterations of the loop
        console.log(id);
        dropdownMenu.append('option').text(id).property('value', id);
    });
    //event listener to dropdown menu
    dropdownMenu.on('change', optionchanged);
    //variable containing value of first sample
    let firstsample = samples[0];
    //log value of first sample
    console.log(firstsample, data);
    //build initial charts and metadata
    buildBarChart(firstsample, data);
    buildBubbleChart(firstsample, data);
    buildMetadata(firstsample, data);
    buildGaugeChart(firstsample, data);
}

//2. create horizontal barchart with dropdown displaying top 10 OTUs in individual
function buildBarChart(id, data) {
    //get data for selected sample
    let individualData = data.samples.filter(sample => sample.id === id)[0];
    //sort data by OTU count in descending order and get the top 10 OTUs
    let top10OTUs = individualData.otu_ids.slice(0, 10).reverse();
    let top10Counts = individualData.sample_values.slice(0, 10).reverse();
    let top10Labels = individualData.otu_labels.slice(0, 10).reverse();
  
    //create bar chart
    let bar_data = [{
      //use sample_values as values for barchart
      x: top10Counts,
      //use otu_ids as labels for barchart
      y: top10OTUs.map(otu => `OTU ${otu}`),
      //set type of chart to bar
      type: "bar",
      //use otu_labels as hovertext for chart
      text: top10Labels,
      //set chart orientation
      orientation: "h"
    }];
  
    let layout = {
      title: "Top 10 OTUs",
      height: 400,
      width: 800
    };
  
    Plotly.newPlot("bar", bar_data, layout);
  };
  

//3. create bubble chart displaying each sample
function buildBubbleChart(sample, data) {
    // Get data for individual sample
    let individualData = data.samples.find(element => element.id == sample);
    //create bubble chart
    let bubble_data = [{
        //use otu_ids as x values
        x: individualData.otu_ids,
        //use sample_values as y values
        y: individualData.sample_values,
        //set type of chart to bar
        mode: "markers",
        //modify the markers
        marker: {
            //use otu_ids for marker colors
            color: individualData.otu_ids,
            //use sample_values for marker size
            size: individualData.sample_values
        },
        //use otu_labels for text values
        text: individualData.otu_labels
    }];
    //chart layout
    let layout = {
        title: "Bacteria in Sample",
        height: 500,
        width: 1000,
        xaxis: {
            title: "OTU ID"
        },
        yaxis: {
            title: "Sample Value"
        }
    };
    Plotly.newPlot("bubble", bubble_data, layout);
};

//4. display sample metadata (demographic info of individual)
function buildMetadata(sample, data) {
    //get data for individual sample
    let individualData = data.metadata.find(element => element.id == sample);
    //select the panel element
    let panel = d3.select("#sample-metadata");
    //clear any existing metadata
    panel.html("");
    //5. display each key-value pair from metadata json object somewhere on the page
    let table = panel.append("table").classed("table", true);
    // Add the demographic information as text
    Object.entries(individualData).forEach(([key, value]) => {
        let row = table.append("tr");
        row.append("td").text(key);
        row.append("td").text(value);
    });
};

//6. update all plots when new sample is selected. create any layout you want
function optionchanged() {
    // select dropdown menu with d3
    let dropdownMenu = d3.select('#selDataset');
    // get the ID of the selected sample
    let selectedSample = dropdownMenu.property('value');
    // Fetch the JSON data and use d3 to get patient names
    d3.json(url).then((data) => {
        // update the bar chart
        buildBarChart(selectedSample, data);
        // update the bubble chart
        buildBubbleChart(selectedSample, data);
        // update the metadata
        buildMetadata(selectedSample, data);
        // extract washing frequency data and pass to buildGaugeChart function
        let wfreq = data.metadata.find(element => element.id == selectedSample).wfreq;
        buildGaugeChart(wfreq);
    });
};


//BONUS: adapt Gauge Chart from  https://plot.ly/javascript/gauge-charts/ to plot weekly washing frequency of individual
function buildGaugeChart(value) {
    //show data for selected sample and create gauge chart
    let data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        title: { text: "Belly Button Washing Frequency<br><sub>Scrubs per Week</sub>" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          'bar': {'color': "rgb(200,200,200)"},
                'bgcolor': "white",
                'borderwidth': 2,
                'bordercolor': "gray",
          steps: [
            {'range': [0, 1], 'color': 'rgb(230, 240, 215)'},
            {'range': [1, 2], 'color': 'rgb(200, 230, 180)'},
            {'range': [2, 3], 'color': 'rgb(170, 220, 140)'},
            {'range': [3, 4], 'color': 'rgb(110, 190, 85)'},
            {'range': [4, 5], 'color': 'rgb(60, 165, 35)'},
            {'range': [5, 6], 'color': 'rgb(41, 150, 44)'},
            {'range': [6, 7], 'color': 'rgb(14, 135, 17)'},
            {'range': [7, 8], 'color': 'rgb(10, 120, 10)'},
            {'range': [8, 9], 'color': 'rgb(0, 105, 0)'},
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: value
          }
        }
      }
    ];
    
    // Set the layout for the gauge chart
    let layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    // Use Plotly to plot the gauge chart on the "gauge-chart" div
    Plotly.newPlot("gauge", data, layout);
  }
  