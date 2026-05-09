import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateTime extends Component 
{
    render()
    {
        
        const {selected,className,onChange,min_date} = this.props
        return (
            <DatePicker
            // customInput={<CustomInput />}
            placeholderText="MM/DD/YYYY"
            className = {"fontstyle "+className}
            selected={selected}
            minDate = {min_date ? new Date(min_date) : ''}
            onChange={(date) => onChange(date)}
            dateFormat="MM/dd/yyyy"
            shouldCloseOnSelect={false}
        />
        )
    }

}
export default DateTime