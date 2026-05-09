import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {convertUTCToLocalDate,convertLocalToUTCDate} from '../../helper'
class DateTime extends Component 
{
    render()
    {
        const getminDate = (min_date) => {
            
            var value = ''
            if(min_date && min_date !== null)
            {
                if(typeof min_date === 'string')
                {
                   
                    value = convertUTCToLocalDate(new Date(min_date))
                }
                else
                {
                    value = convertUTCToLocalDate(min_date)
                }
            }

            return value
        }
       
        const {selected,className,onChange,onSelect,min_date,minTime,disabled} = this.props
        return (
            <DatePicker
            placeholderText="MM/DD/YYYY hh:mm:ss AM/PM"
            className = {"fontstyle "+className}
            selected={convertUTCToLocalDate(selected)}
            minDate = {getminDate(min_date) }
            minTime={minTime? new Date(minTime) : ''}
            onChange={(date) => onChange(convertLocalToUTCDate(date))}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy hh:mm:ss a"
            showTimeInput
            shouldCloseOnSelect={false}
            popperPlacement="top-start"
            disabled = {disabled ? disabled : false}
           
        />
        )
    }

}
export default DateTime