import { useEffect, useState } from "react";
import DropDown from "./DropDown";

const ColorSelector = function(props){
    const colors = [ "white", "red", "blue", "green", "black", "custom" ];//Predefined colors to select by the user or the custom color.

    const [ selectedColor, setSelectedColor ] = useState();//To store the dropdown value.
    const [ pickedColor, setPickedColor ] = useState("#000000");//To store the color picker value.

    useEffect(() => {
        if(colors.includes(props.defaultValue))//If the defaultValue is present in the colors list we need to set that unless we need to set in the pickedColor.
            onColorSelect(props.defaultValue)
        else{
            setSelectedColor("custom");
            setPickedColor(props.defaultValue);
        }
    }, [])

    const onColorSelect = function(value){
        if(selectedColor != value){
            setSelectedColor(value);
            let newValue = value;
            if(value == "custom")//If the selected value is custom then we need to update the value of the color picker.
                newValue = pickedColor;
            props.onChange(newValue);
        }
    }

    const onColorPick = function(e){
        let color = e.target.value;
        setPickedColor(color);
        props.onChange(color);
    }

    return(
        <div className={props.customClass}>
            <DropDown customId={props.customId} customClass="inline_block v_align_m" options={colors} value={selectedColor} onChange={onColorSelect}/>
            {selectedColor == "custom" &&
                <input className="color-picker m_l_5 inline_block v_align_m" type="color" value={pickedColor} onChange={onColorPick}></input>}
        </div>
    )
}

export default ColorSelector;