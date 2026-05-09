import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
const HighLineChart = ({
  widgetTitle,
  name,
  series,
  colors,
  fill,
  textcolor,
  categories,
}) => {
    const options = {
        chart: {
            height: 300
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
                text: ''
            }
        },
    
        xAxis: {
            categories: categories ? categories : []
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
                label: {
                    connectorAllowed: false
                },
                marker: {
                    enabled: false
                }
            }
        },
        exporting: {
            enabled: true
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
