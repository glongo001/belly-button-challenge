//first save the data from url as constant
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

//1. use d3 to load dataset
d3.json(url).then(function(data) {
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

//call init function to initialize the dropdown menu and the charts
d3.json(url).then(init, function(error) {
    console.log(error);
});

//2. create horizontal barchart with dropdown displaying top 10 OTUs in individual
function buildBarChart(sample, data) {
    //get data for selected sample
    let individualData = data.samples.find(element => element.id == sample);
    //sort data by OTU count in descending order and get the top 10 OTUs
    let top10OTUs = individualData.otu_ids.slice(0, 10).reverse();
    let top10Counts = individualData.sample_values.slice(0, 10).reverse();
    let top10Labels = individualData.otu_labels.slice(0, 10).reverse();

    //create bar chart
    let bar_data = [{
        //use sample_values as values for barchart
        values: top10Counts,
        //use otu_ids as labels for barchart
        labels: top10OTUs,
        //set type of chart to bar
        type: "bar",
        //use otu_labels as hovertext for chart
        hovertext: top10Labels,
        //set chart orientation
        orientation: "h"
    }];

    let layout = {
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
        markers: {
            //use otu_ids for marker colors
            color: individualData.otu_ids,
            //use sample_values for marker size
            size: individualData.sample_values
        },
        //use otu_labels for text values
        text: individualData.otu_labels
    }];

    let layout = {
        height: 500,
        width: 1000
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
    // extract washing frequency data and pass to buildGaugeChart function
    let wfreq = data.metadata.find(element => element.id == sample).wfreq;
    buildGaugeChart(wfreq);
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
    });
};

//BONUS: adapt Gauge Chart from  https://plot.ly/javascript/gauge-charts/ to plot weekly washing frequency of individual
function buildGaugeChart(sample) {
    // Filter the data for the selected sample
    var metadata = data.metadata.filter(obj => obj.id == sample)[0];
    var washFreq = metadata.wfreq;

    // Create the gauge chart
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "Belly Button Washing Frequency<br><sub>Scrubs per Week</sub>" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
            //modify gauge code for values randing from 0 through 9
            axis: { range: [0, 9], tickwidth: 1, tickcolor: "black" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 1], color: "#f7e8e8" },
                { range: [1, 2], color: "#f2d9d9" },
                { range: [2, 3], color: "#e6b8b8" },
                { range: [3, 4], color: "#e0aaaa" },
                { range: [4, 5], color: "#d37d7d" },
                { range: [5, 6], color: "#c77a7a" },
                { range: [6, 7], color: "#b35050" },
                { range: [7, 8], color: "#a64444" },
                { range: [8, 9], color: "#8f2e2e" }
            ]}}];
    // Set the layout for the gauge chart
    var layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };
    // Use Plotly to plot the gauge chart on the "gauge-chart" div
    Plotly.newPlot("gauge-chart", data, layout);
};
  
//update with each sample that is selected
function updateGaugeChart(value) {
    var gaugeChart = document.getElementById("gauge-chart");
    Plotly.animate(gaugeChart, {
        data: [{ value: value }]
    }, {
        transition: {
            duration: 500,
            easing: "cubic-in-out"
        }
    });
};

