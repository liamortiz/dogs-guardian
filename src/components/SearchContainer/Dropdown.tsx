import React from 'react';

interface DropdownProps {
    updateAnimals: (animalType: string) => void,
    options: string[],
    label: string
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    function handleDropdownChange(event: React.ChangeEvent) {
        props.updateAnimals((event.target as HTMLSelectElement).value);
        
    }
    return (
        <select name="types" onChange={handleDropdownChange} defaultValue="1">
            <option value='1' disabled>{props.label}</option>
            {props.options.map(option => <option value={option}>{option}</option>)}
        </select>
    )
}
export default Dropdown;