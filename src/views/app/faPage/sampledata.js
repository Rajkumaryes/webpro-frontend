import React, { Component } from 'react';
import { Table,Checkbox,Input } from 'antd';
import Select from 'react-select';
export const  columns = [
    {
      title: 'Shipment',
      dataIndex: 'Shipment',
      key: 'Shipment',
      render: (text, record,index) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
          <Input value = "8687687"/>
        </div>
    ),
     
    },
    {
        title: 'Sub Region',
        dataIndex: 'Sub Region',
        key: 'Sub Region',
        render: (text, record,index) => ( 
          <div style = {{padding:'2px',width:'80px'}}>
            <Input value = "NCD"/>
          </div>
      ),
    },
    {
        title: 'Contract Party',
        dataIndex: 'Contract Party',
        key: 'Contract Party',
        render: (text, record,index) => ( 
          <div style = {{padding:'2px',width:'80px'}}>
           <Input value = "NCD 8687687"/>
          </div>
      ),
    },
    {
        title: 'CS Booking',
        dataIndex: 'CS Booking',
        key: 'CS Booking',
        render: (text, record,index) => ( 
          <div style = {{padding:'2px',width:'80px'}}>
              <Input value = "NCD 8687687"/>
          </div>
      ),
    },
    {
      title: 'Office',
      dataIndex: 'Office',
      key: 'Office',
      render: (text, record,index) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
            <Input value = "NCD 8687687"/>
        </div>
    ),
    },
    {
      title: 'ETD 1st Vessle',
      dataIndex: 'ETD 1st Vessle',
      key: 'ETD 1st Vessle',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input value = "12/12/21" / >
           
        </div>),
    },
    {
      title: 'ETA Last Vessle',
      dataIndex: 'ETA Last Vessle',
      key: 'ETA Last Vessle',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input value = "12/12/21" / >
           
        </div>),
    },
    {
      title: 'Main DP Voyage',
      dataIndex: 'Main DP Voyage',
      key: 'Main DP Voyage',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input value = "UERR" / >
           
        </div>),
    },    
    {
      title: 'OP POL',
      dataIndex: 'OP POL',
      key: 'OP POL',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input value = "UERR" / >
           
        </div>),
    },  
    {
      title: 'EX ID',
      dataIndex: 'EX ID',
      key: 'EX ID',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input  / >
           
        </div>),
    },
    {
      title: 'EX Quality',
      dataIndex: 'EX Quality',
      key: 'EX Quality',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input  / >
           
        </div>),
    },
    {
      title: 'IM ID',
      dataIndex: 'IM ID',
      key: 'IM ID',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input / >
           
        </div>),
    },
    {
      title: 'IM Quality',
      dataIndex: 'IM Quality',
      key: 'IM Quality',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input / >
           
        </div>),
    },
    {
      title: 'CC Sales Heir',
      dataIndex: 'CC Sales Heir',
      key: 'CC Sales Heir',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         <Input / >
           
        </div>),
    },
   
    
  ];

  
 