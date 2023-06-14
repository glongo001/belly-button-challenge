# Belly Button Challenge
I built an interactive dashboard that explores a Belly Button Biodiversity Dataset. The dataset contains a list of patients with the microbes that colonize each patient's navel. The microbial species are referred to as operational taxonomic units (OTUs). It was found that a handful of OTUs were present in more than 70% of patients.

## Charts and Metadata
1. First, I saved the url `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json` as a variable and used the D3 library to read the data.

2. I created a function that used D3 to create a dropdown menu. 
    - I added all patient ids to the dropdown menu and added an event listener to allow the selection of new samples.
    
![alt text](https://github.com/glongo001/belly-button-challenge/blob/main/Images/dropdown.png)

    - I built the initial charts and metadata with the first sample in the dataset.
    
![alt text](https://github.com/glongo001/belly-button-challenge/blob/main/Images/initialpage.png)

3. I created a horizontal bar chart that displayed the top 10 OTUs in each patient. I sorted the OTUs in descending order and sliced the first 10 OTUs to get the top 10. I displayed the OTU ids on the y axis, the OTU sample count on the x axis, and used the OTU labels (type of microbe) to display as hovertext. Used Plotly to create the chart.

![alt text](https://github.com/glongo001/belly-button-challenge/blob/main/Images/barchart.png)

4. I created a bubble chart that displayed all OTUs in each sample. It displayed the OTU ids on the x axis, the OTU sample count on the y axis, and created markers that changed the bubble color based on the OTU id, and changed the bubble size based on the OTU sample count. I used the OTU labels to display as text when hovering over each OTU. I used Plotly to create the chart.

![alt text](https://github.com/glongo001/belly-button-challenge/blob/main/Images/bubblechart.png)

5. I displayed the sample metadata (demographic information of each patient). 

![alt text](https://github.com/glongo001/belly-button-challenge/blob/main/Images/metadata.png)

6. I created a function that updated all plots when a new sample is selected on the dropdown menu.

Source: Used https://plotly.com/javascript/, https://d3js.org/, previous class assignments and Stack Overflow for reference.

7. I created a gauge chart that showed the washing frequency (scrubs per week) for each patient. I used Plotly to create the chart.

![alt text](https://github.com/glongo001/belly-button-challenge/blob/main/Images/gaugechart.png)

8. I deployed the app to Github Pages:
    - https://glongo001.github.io/belly-button-challenge/

Source: Used https://plotly.com/javascript/, https://d3js.org/, previous class assignments and Stack Overflow for reference.
