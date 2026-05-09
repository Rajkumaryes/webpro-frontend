import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateTime extends Component {
    render() {
        const { selected, className, onChange, min_date, disabled } = this.props;
        return (
            <div style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
                <DatePicker
                    placeholderText="MM/DD/YYYY"
                    className={"fontstyle " + className}
                    selected={selected}
                    minDate={min_date ? new Date(min_date) : ''}
                    onChange={(date) => onChange(date)}
                    dateFormat="MM/dd/yyyy"
                    shouldCloseOnSelect={false}
                />
            </div>
        );
    }
}
export default DateTime