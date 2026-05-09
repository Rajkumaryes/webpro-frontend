import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateTime extends Component 
{
    render()
    {
       
        const {selected,className,onChange,min_date,minTime,disabled} = this.props
        return (
            <DatePicker
            // customInput={<CustomInput />}
            placeholderText="MM-DD-YYYY hh:mm:ss AM/PM"
            className = {"fontstyle "+className}
            selected={selected}
            minDate = {min_date? new Date(min_date) : '' }
            minTime={minTime? new Date(minTime) : ''}
            onChange={(date) => onChange(date)}
            timeInputLabel="Time:"
            dateFormat="MM-DD-YYYY hh:mm:ss a"
            showTimeInput
            // onSelect = {()=>onSelect()}
            shouldCloseOnSelect={false}
            popperPlacement="top-start"
            disabled = {disabled ? disabled : false}
           
        />
        )
    }

}
export default DateTime