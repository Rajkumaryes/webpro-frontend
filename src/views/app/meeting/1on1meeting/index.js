import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-charts-community/styles/ag-charts.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000, chartData: [10, 20, 30] },
  { make: 'Ford', model: 'Mondeo', price: 32000, chartData: [5, 15, 25] },
  { make: 'Porsche', model: 'Boxster', price: 72000, chartData: [15, 10, 5] },
];

const priceRenderer = (params) => {
    return (
        <div style={{ backgroundColor: params.value > 33000 ? "green" : "red", color: "white", paddingLeft: "12px"}}>
            {params.value > 33000 ? 
            <div>
                <AiOutlineArrowUp/>
                <span>{params.value}</span>
            </div>
            :
            <div>
                <AiOutlineArrowDown/>
                <span>{params.value}</span>
            </div>
            }
        </div>
    )
}
const columnDefs = [
  { headerName: 'Make', field: 'make' },
  { headerName: 'Model', field: 'model' },
  { headerName: 'Price', field: 'price',
    cellRenderer : priceRenderer
 },
  {
    headerName: 'Chart',
    field: 'chartData',
    cellRendererFramework: ChartRenderer,
  },
];

const ChartRenderer = (props) => {
  const { value } = props;
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Chart Data',
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3'],
    },
    series: [
      {
        name: 'Data',
        data: value,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const AgGridWithCharts = () => {
  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default AgGridWithCharts;
