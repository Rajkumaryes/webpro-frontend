import React, { Component } from 'react';
import { Table,Checkbox,Input } from 'antd';
import Select from 'react-select';

export const  columns = [

  {
    title: 'Region',
    dataIndex: 'Region',
    key: 'Region',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} 
           options = {region} 
           />
      </div>),
  },
  {
    title: 'Area',
    dataIndex: 'Area',
    key: 'Area',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text}
           options = {area} 
          />
      </div>),
  },
  {
    title: 'Priority',
    dataIndex: 'Priority',
    key: 'Priority',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
         <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Size',
    dataIndex: 'Size',
    key: 'Size',
    render: (text, record) => ( 
      <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
       <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} disabled></Select>
      </div>),
  },
  {
    title: 'Received Date',
    dataIndex: 'Received Date',
    key: 'Received Date',
  },
    // {
    //   title: 'Request No',
    //   dataIndex: 'Request No',
    //   key: 'Request No',
    // },
    {
      title: 'Request No',
      dataIndex: 'Request No',
      key: 'Request No',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
            <Input value={text} />
        </div>),
    },
    {
      title: 'Quote No',
      dataIndex: 'Quote No',
      key: 'Quote No',
    },
    {
      title: 'OOT',
      dataIndex: 'OOT',
      key: 'OOT',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
            <Input value={text} />
        </div>),
    },
    {
      title: 'Type of Request',
      dataIndex: 'Type of Request',
      key: 'Type of Request',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} disabled></Select>
        </div>),
      },
    {
      title: 'Publisher',
      dataIndex: 'Publisher',
      key: 'Publisher',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
           <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Auditor',
      dataIndex: 'Auditor',
      key: 'Auditor',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
            <Select className="react-select fontstyle" classNamePrefix="react-select"  value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Customer Requirement Time',
      dataIndex: 'Customer Requirement Time',
      key: 'Customer Requirement Time',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'60px'}}>
            <Input value={text}/>
        </div>),
    },
    {
      title: 'Customer Volume Details',
      dataIndex: 'Customer Volume Details',
      key: 'Customer Volume Details',
     
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
    // {
    //   title: 'TAT Information',
    //   dataIndex: 'TAT Information',
    //   key: 'TAT Information',
    //   render: (text, record) => ( 
    //     <span>
    //     <Checkbox  />
    //    {text}
    //     </span>
       
    //     ),
    // }
   
   
  ];

  export const  columns1 = [
    {
      title: 'Publisher',
      dataIndex: 'Publisher',
      key: 'Publisher',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center"  style = {{padding:'2px'}}>
           <Select className="react-select fontstyle"   value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px'}}>
           <Select className="react-select fontstyle reactwidth"   value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Quotation Number',
      dataIndex: 'Quotation Number',
      key: 'Quotation Number',
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
        <div className="row d-flex justify-content-center"  style = {{padding:'2px'}}>
           <Select className="react-select fontstyle reactwidth"   value={text} disabled></Select>
        </div>),
    },
    {
      title: 'Status',
      dataIndex: 'Status1',
      key: 'Status1',
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',}}>
          <Select className="react-select fontstyle reactwidth"  
          options = {status}
          value={text} />
           
        </div>),
    }
    
  ];

  const status = [
    {label : 'To Be Started' , value :'To Be Started'},
    {label : 'In Process' , value :'In Process'},
  ]
  const area = [
    {label : 'NNE' , value :'NNE'},
    {label : 'NSW' , value :'NSW'},
    {label : 'NCE' , value :'NCE'},

  ]
  const region = [
    {label : 'RNA' , value :'RNA'},
    // {label : 'GAM' , value :'GAM'},
    // {label : 'ASIA' , value :'ASIA'},

  ]