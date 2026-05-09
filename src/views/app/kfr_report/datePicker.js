import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {convertUTCToLocalDate,convertLocalToUTCDate} from '../../../helper'
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
            placeholderText="YYYY"
            className = {"fontstyle "+className}
            selected={convertUTCToLocalDate(selected)}
            minDate = {getminDate(min_date) }
            minTime={minTime? new Date(minTime) : ''}
            onChange={(date) => onChange(convertLocalToUTCDate(date))}
            dateFormat="yyyy"
            showYearPicker
            shouldCloseOnSelect={false}
            // popperPlacement="top-start"
            disabled = {disabled ? disabled : false}
           
        />
        )
    }

}
export default DateTime