import React from 'react';

interface DropdownProps {
    filterBy: (filter: {action: string, value: string}) => void,
    options: string[],
    label: string
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    function handleDropdownChange(event: React.ChangeEvent) {
        const filter = {action: props.label, value: (event.target as HTMLSelectElement).value}
        props.filterBy(filter);
        
    }
    return (
        <select name="types" onChange={handleDropdownChange} defaultValue="1">
            <option value='1' disabled>{props.label}</option>
            {props.options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    )
}
export default Dropdown;