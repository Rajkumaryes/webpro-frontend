import React, { Component } from 'react';
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";

class DateTime extends Component 
{
    render()
    {
        const {date,className,onChangeDateTimePicker} = this.props
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="pickers">
                <DateTimePicker
                className = {"fontstyle "+className}
                    InputProps={{
                    disableUnderline: true,
                    }}
                    value={(date !== "" && date) ? date  : null}
                    fullWidth
                    format = "MM/DD/YYYY hh:mm a"
                    onChange={date =>onChangeDateTimePicker(date)}
                    leftArrowIcon={<i className="simple-icon-arrow-left" />}
                    rightArrowIcon={<i className="simple-icon-arrow-right" />}
                />
                </div>
          </MuiPickersUtilsProvider>
        )
    }

}
export default DateTime