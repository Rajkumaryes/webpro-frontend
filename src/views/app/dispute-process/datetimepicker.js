import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateTime extends Component 
{
    render()
    {
                const {selected,className,onChange} = this.props
        return (
            <DatePicker
            className = {"fontstyle "+className}
            selected={selected}
            showTimeSelect 
            showTimeSelectOnly 
            dateFormat="hh:mm:ss a" 
            timeIntervals={1}
            onChange={(date) => onChange(date)}
        />
        )
    }

}
export default DateTime