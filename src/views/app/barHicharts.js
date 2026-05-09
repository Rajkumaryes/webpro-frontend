import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
require("highcharts/modules/exporting")(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
const HighLineChart = ({
  series,
  categories,
  title,
  file_name
}) => {
    const options = {
        chart: {
            height: 300,
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
    
        subtitle: {
            text: ''
        },
    
        yAxis: {
            title: {
                text: 'Unit'
            },
            labels: {
                enabled: true
            },
              stackLabels: {
              enabled: false,
              style: {
                  fontWeight: 'bold',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
          },
        },
    
        xAxis: {
            categories: categories ? categories : [],
            title: {
                text: title
            }
          },
    
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
        },
        tooltip: {
            backgroundColor: 'white',
            borderColor: 'rgb(0, 103, 127)',
            borderRadius: 10,
            borderWidth: 0.5,
            formatter: function() {
                return  this.x 
                 + '<br></br><b>' + (this.series.name.replace(/[0-9]/g, '')).replace(/[{()}]/g, '') + '</b> : <b>' + this.y ;
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        
        exporting: {
            buttons: {
                contextButton: {
                  menuItems: ["downloadPNG", "downloadPDF", "downloadCSV"]
              }
            },
            filename: file_name
          },
        series: series ? series : [],
    
    }


  return (
    <HighchartsReact
    highcharts={Highcharts}
    options={options}
    />
  );
};

export default HighLineChart;
