
import React, { Component } from 'react';
class CustomRadioButton extends Component 
{
    render()
    {
        const {checked,value,name,onChangeRadio} = this.props
        return (
            <label class="radiobtn fontstyle">{name}
                    <input type="radio" value = {name} checked = {checked === value}  onChange={(e)=>onChangeRadio(name)}/>
                    <span class="checkmark"></span>
            </label>
        )
    }

}
export default CustomRadioButton
