import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
const HighDonutChart = ({
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
            height: 300,
            type: 'pie'
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
            categories: categories ? categories : [],
          },
    
          legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom'
        },
        tooltip: {
            backgroundColor: 'white',
            borderColor: 'rgb(0, 103, 127)',
            borderRadius: 10,
            borderWidth: 0.5,
            formatter: function() {
                return  (this.point.name.replace(/[0-9]/g, '')).replace(/[{()}]/g, '')
                 + ': <b>' + this.y  ;
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                }
            },
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

export default HighDonutChart;
