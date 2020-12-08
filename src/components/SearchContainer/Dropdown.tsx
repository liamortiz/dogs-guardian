import React from 'react';

interface DropdownProps {
    updateAnimals: (animalType: string) => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    function handleDropdownChange(event: React.ChangeEvent) {
        props.updateAnimals((event.target as HTMLSelectElement).value);
        
    }
    return (
        <select name="types" onChange={handleDropdownChange} defaultValue="dog">
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="rabbit">Rabbits</option>
            <option value="horse">Horses</option>
            <option value="bird">Birds</option>
            <option value="barnyard">Barnyard</option>
        </select>
    )
}
export default Dropdown;