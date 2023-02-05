const DropDown = function(props){
    return(
        <select id={props.customId} className={props.customClass} value={props.value} onChange={ e => props.onChange(e.target.value)}>
            {props.options.map(opt => <option key={opt}>{opt}</option>)};
        </select>
    )
}

export default DropDown;