import React, { Component } from 'react';
import { Table,Checkbox,Input } from 'antd';
import Select from 'react-select';
const typeofrq=[
  {id:1,name:'test'}
]
export const  columns = [
  {
    title: 'Request No',
    dataIndex: 'Request No',
    key: 'Request No',
  },
  {
    title: 'Contract No.',
    dataIndex: 'Contract No',
    key: 'Contract No',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
          <Input
          value = {text} 
          // onChange= {(e)=>this.setState({text : e.target.value})}
          / >
      </div>),
  },
  {
    title: 'Types Of RQ',
    dataIndex: 'Types Of RQ',
    key: 'Types Of RQ',
  },
  {
    title: 'AMD No',
    dataIndex: 'AMD No',
    key: 'AMD No',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Area',
    dataIndex: 'Area',
    key: 'Area',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Region',
    dataIndex: 'Region',
    key: 'Region',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Priority',
    dataIndex: 'Priority',
    key: 'Priority',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Size',
    dataIndex: 'Size',
    key: 'Size',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Received Time',
    dataIndex: 'Received Time',
    key: 'Received Time',
  },
  {
    title: 'Publisher',
    dataIndex: 'Publisher',
    key: 'Publisher',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth" 
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Auditor',
    dataIndex: 'Auditor',
    key: 'Auditor',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth" 
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Status',
    dataIndex: 'Status1',
    key: 'Status1',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Time Left',
    dataIndex: 'Time Left',
    key: 'Time Left',
  },
  {
    title: 'TAT',
    dataIndex: 'TAT',
    key: 'TAT',
  },
  {
    title: 'OOT',
    dataIndex: 'OOT',
    key: 'OOT',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
          <Input value={text}/ >
      </div>),
  },
 
];
export const  correctionlog = [
    {
      title: 'Request No',
      dataIndex: 'Request No',
      key: 'Request No',
    },
    {
      title: 'Contract No.',
      dataIndex: 'Contract No',
      key: 'Contract No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input
            value = {text} 
            // onChange= {(e)=>this.setState({text : e.target.value})}
            / >
        </div>),
    },
    
    {
      title: 'AMD No',
      dataIndex: 'AMD No',
      key: 'AMD No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth" 
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
    title: 'Region',
    dataIndex: 'Region',
    key: 'Region',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
    {
      title: 'Date and Time',
      dataIndex: 'Date and Time',
      key: 'Date and Time',
    },
    {
      title: 'Internal /External',
      dataIndex: 'Priority',
      key: 'Priority',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    
    
    {
      title: 'Contact Done By',
      dataIndex: 'Publisher',
      key: 'Publisher',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth" 
            value={text} disabled></Select>
        </div>),
    },
    
    {
      title: 'Auditor',
      dataIndex: 'Auditor',
      key: 'Auditor',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Error Type',
      dataIndex: 'Status1',
      key: 'Status1',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Comment',
      dataIndex: 'Comment',
      key: 'Comment',
    },
    {
      title: 'Corrector',
      dataIndex: 'TAT',
      key: 'TAT',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input value={text}/ >
        </div>),
    },
    {
      title: 'Log Time',
      dataIndex: 'OOT',
      key: 'OOT',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input value={text}/ >
        </div>),
    }
  ];
  export const  crossborder = [
    {
      title: 'Request In Time',
      dataIndex: 'Request No',
      key: 'Request No',
    },
    {
      title: 'Request No',
      dataIndex: 'Date and Time',
      key: 'Date and Time',
    },
    {
      title: 'Booking No.',
      dataIndex: 'Contract No',
      key: 'Contract No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input
            value = {text} 
            // onChange= {(e)=>this.setState({text : e.target.value})}
            / >
        </div>),
    },
    
    {
      title: 'CC/RA NO',
      dataIndex: 'AMD No',
      key: 'AMD No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Tariff',
      dataIndex: 'Area',
      key: 'Area',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    
    {
      title: 'Shipper',
      dataIndex: 'Priority',
      key: 'Priority',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth" 
            value={text} disabled></Select>
        </div>),
    },
    
    
    {
      title: 'Publisher',
      dataIndex: 'Publisher',
      key: 'Publisher',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    
    
    {
      title: 'Status',
      dataIndex: 'Status1',
      key: 'Status1',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Reason for Query',
      dataIndex: 'Comment',
      key: 'Comment',
    },
   
    
  ];
export const  columns2 = [
    {
      title: 'Request No',
      dataIndex: 'Request No',
      key: 'Request No',
    },
    {
      title: 'Contract No.',
      dataIndex: 'Contract No',
      key: 'Contract No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input
            value = {text} 
            // onChange= {(e)=>this.setState({text : e.target.value})}
            / >
        </div>),
    },
    {
      title: 'Types Of RQ',
      dataIndex: 'Types Of RQ',
      key: 'Types Of RQ',
    },
    {
      title: 'AMD No',
      dataIndex: 'AMD No',
      key: 'AMD No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
    title: 'Region',
    dataIndex: 'Region',
    key: 'Region',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
          <Select className="react-select fontstyle reactwidth"  
          value={text} disabled></Select>
      </div>),
  },
    {
      title: 'Priority',
      dataIndex: 'Priority',
      key: 'Priority',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Size',
      dataIndex: 'Size',
      key: 'Size',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Received Time',
      dataIndex: 'Received Time',
      key: 'Received Time',
    },
    {
      title: 'Publisher',
      dataIndex: 'Publisher',
      key: 'Publisher',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Auditor',
      dataIndex: 'Auditor',
      key: 'Auditor',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status1',
      key: 'Status1',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Time Left',
      dataIndex: 'Time Left',
      key: 'Time Left',
    },
    {
      title: 'TAT',
      dataIndex: 'TAT',
      key: 'TAT',
    },
    {
      title: 'OOT',
      dataIndex: 'OOT',
      key: 'OOT',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input value={text}/ >
        </div>),
    },
    {
      title: 'TAT Information',
      dataIndex: 'TAT Information',
      key: 'TAT Information',
      render: (text, record) => ( 
        <span>
        <Checkbox  />
       {text}
        </span>
       
        ),
    },
  {
      title: 'Static',
      dataIndex: 'Static',
      key: 'Static',
      render: (text, record) => ( 
        <span className="row d-flex justify-content-center" style = {{padding:'2px'}}>
        <Input  value={text}/>
        <Input  />
        <Input  />
        </span>
       
        ),
    }
  ];
  export const  columns1 = [
    {
      title: 'Publisher',
      dataIndex: 'Publisher',
      key: 'Publisher',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Tab Details',
      dataIndex: 'Tab Details',
      key: 'Tab Details',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Input value={text}/>
        </div>),
    },
    {
      title: 'Auditor',
      dataIndex: 'Auditor',
      key: 'Auditor',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status1',
      key: 'Status1',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
            <Select className="react-select fontstyle reactwidth"  
            value={text} disabled></Select>
        </div>),
    }
    
  ];