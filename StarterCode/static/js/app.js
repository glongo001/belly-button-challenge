//first save the data from url as constant
const dataset = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

//create dropdown menu to pick sample
function init() {
    //select dropdown menu with d3
    let dropdownMenu = d3.select('#selDataset');
    // Fetch the JSON data and use d3 to get patient names
    d3.json(dataset).then((data) => {
        //create variable for patient names
        let samples = data.names;
        //add each name to the dropdown menu
        samples.forEAch((id) => {
            //log each id for all iterations of the loop
            console.log(id);
            dropdownMenu.append('option').text(id).property('value', id);
        });
        //variable containing value of first sample
        let firstsample = samples[0];
        //build initial charts and metadata
        buildBarChart(firstsample);
        buildBubbleChart(firstsample);
        buildMetadata(firstsample);
        buildGaugeChart(firstsample);
    });
}

//2. create horizontal barchart woth dropdown displaying top 10 OTUs in individual
function buildBarChart(sample) {
    
}
//use sample_values as values for barchart

//use otu_ids as labels for barchart

//use otu_labels as hovertext for chart

//3. create bubble chart displaying each sample

//use otu_ids as x values

//use sample_values as y values

//use otu_ids for marker colors

//use sample_values for marker size

//use out_labels for text values

//4. display sample metadata (demographic info of individual)

//5. display each key-value pair from metadata json object somewhere on the page

//6. update all plots when new sample is selected. create any layout you want

//7. deploy app to free static page hosting service (GitHub pages)

//BONUS: adapt Gauge Chart from  https://plot.ly/javascript/gauge-charts/ to plot weekly washing frequency of individual

//modify gauge code for values randing from 0 through 9

//update with each sample that is selected

//HINTS: use console.log to see what data looks like at each step
//refer to plotly.js doc