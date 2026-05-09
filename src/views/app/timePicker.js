import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class DatePickerTime extends Component 
{

    
    getDate(selected)
    {
        var time = ''
        var date = moment(new Date()).format('MM/DD/YYYY')
        if(selected !== '' && selected !== null)
        {
            time = new Date(date + ' ' + selected)
        }
        return time
    }

    render()
    {
        
        const {selected,className,onChange,min_date,dateFormat} = this.props
        
       
        return (
            <DatePicker
            className = {"fontstyle "+ className}
            selected={this.getDate(selected)}
            showTimeSelect 
            showTimeSelectOnly 
            dateFormat={dateFormat? dateFormat : 'hh:mm:ss a'}         
            timeIntervals={1}
            onChange={(date) => onChange(date)}
        />
        )
    }

}
export default DatePickerTime