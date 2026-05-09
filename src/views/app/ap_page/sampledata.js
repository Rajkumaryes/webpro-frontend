import React, { Component } from 'react';
import { Table,Checkbox,Input } from 'antd';
import Select from 'react-select';


  export const  columns2 = [
    {
      title: 'Document ID',
      dataIndex: 'Document Id',
      key: 'Document Id',
     
    },
    {
      title: 'VIM Processs Status Text',
      dataIndex: 'VIM Processs Status Text',
      key: 'VIM Processs Status Text',
    },
    {
      title: 'Scan Location',
      dataIndex: 'Scan Location',
      key: 'Scan Location',
    },
    {
      title: 'Vendor',
      dataIndex: 'Vendor',
      key: 'Vendor',
    },
    {
      title: 'Gross Invoice Amount',
      dataIndex: 'Gross Invoice Amount',
      key: 'Gross Invoice Amount',
    },
      {
      title: 'Currency',
      dataIndex: 'Currency',
      key: 'Currency',
    },
    {
      title: 'Company Code',
      dataIndex: 'Company Code',
      key: 'Company Code',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
        {text} 
           
        </div>),
    },
  
    {
      title: 'Document Number',
      dataIndex: 'Document Number',
      key: 'Document Number',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         {text}
           
        </div>),
    },  
    {
      title: 'Posting Date',
      dataIndex: 'Posting Date',
      key: 'Posting Date',
    }, 
     {
      title: 'Last User',
      dataIndex: 'Last User',
      key: 'Last User',
      render: (text, record) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
       Test
         
      </div>),
    }, 
    
   {
        title:'User Name'  ,
        dataIndex: 'number',
        key: 'number',
        render: (text, record) => ( 
          <div style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select" 
           style = {{width:'100%'}}/ >
           
        </div>),
      },
    {
      title: 'Region',
      dataIndex: 'Region',
      key: 'Region',
      render: (text, record,index) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select" 
           style = {{width:'100%'}}
          value ={[{label:text,value:text}]}/ >
           
        </div>),
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select" 
          style = {{width:'100%'}}
          value ={[{label:text,value:text}]}/ >
           
        </div>),
    },
   

    
  ];


  export const  columns4 = [
    
    {
      title: 'Document ID',
      dataIndex: 'Document Id',
      key: 'Document Id',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         3232323
           
        </div>),
    },
    {
      title: 'VIM Process Status Text',
      dataIndex: 'VIM Process Status Text',
      key: 'VIM Process Status Text',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         Created
           
        </div>),
    }, 
    {
      title: 'Scan Location',
      dataIndex: 'Scan Location',
      key: 'Scan Location',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         XG31 IND/GSC
           
        </div>),
    },
    {
      title: 'Vendor',
      dataIndex: 'Vendor',
      key: 'Vendor',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         87557t8
           
        </div>),
    },
    {
      title: 'Gross Invoice Amount',
      dataIndex: 'Vendor Name',
      key: 'Vendor Name',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
         87557t8
           
        </div>),
    },
    {
      title: 'Company Code',
      dataIndex: 'Company Code',
      key: 'Company Code',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
    },
    {
      title: 'Currency',
      dataIndex: 'Currency',
      key: 'Currency',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
    },
     {
      title: 'Document Number',
      dataIndex: 'Document Number',
      key: 'Document Number',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
    },
    {
      title:'Posting Date'  ,
      dataIndex: 'Posting Date',
      key: 'Posting Date',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'80px'}}>
           <a>12/23/21</a> 
           
        </div>),
    },
   {
      title: 'Region',
      dataIndex: 'Region',
      key: 'Region',
      render: (text, record,index) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select" 
           style = {{width:'100%'}}
          value ={[{label:text,value:text}]}/ >
           
        </div>),
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
      render: (text, record,index) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select" 
          style = {{width:'100%'}}
          value ={[{label:text,value:text}]}/ >
           
        </div>),
    },
    {
      title: 'Invoice Status',
      dataIndex: 'Status',
      key: 'Status',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div  style = {{padding:'2px',width:'80px'}}>
        <Select className="react-select fontstyle" classNamePrefix="react-select" 
        style = {{width:'100%'}}
        value ={[{label:text,value:text}]}/ >
         
      </div>),
      
    },
    {
      title: 'Last User',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'80px'}}>
           TEST
           
        </div>),
    },
     {
      title: 'User ID',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'80px'}}>
           TEST
           
        </div>),
    },
   
    {
      title: 'JIRA Ticket',
      dataIndex: 'JIRA Ticket',
      key: 'JIRA Ticket',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'80px'}}>
           <Input />
           
        </div>),
    },
  
    {
      title: 'Posting User ID ',
      dataIndex: 'Posting User ID',
      key: 'Posting User ID',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select"/ >
           
        </div>),
    },
    {
      title: 'Error Category',
      dataIndex: 'Error Category',
      key: 'Error Category',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
          <Select className="react-select fontstyle" classNamePrefix="react-select"/ >
           
        </div>),
    },
    {
      title: 'Final Audit Status',
      dataIndex: 'Other Comments',
      key: 'Other Comments',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div style = {{padding:'2px',width:'80px'}}>
        <Select className="react-select fontstyle" classNamePrefix="react-select"/ >
         
      </div>),
    },
    {
      title: 'GSC Process Date',
      dataIndex: 'GSC Process Date',
      key: 'GSC Process Date',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'80px'}}>
          12/21/23
           
        </div>),
    },
    {
      title: 'GSC Process Time',
      dataIndex: 'GSC Process Time',
      key: 'GSC Process Time',
      sorter: (a, b) => (a['Month'] != null ?
      a['Month'] : "").localeCompare(b['Month'] !== null ? 
      b['Month'] : ""),
      render: (text, record) => ( 
        <div className="row d-flex justify-content-center" style = {{padding:'2px',width:'80px'}}>
       12.00 PM
        
     </div>),
    },
  ];
 
 