import React, { useState } from 'react';
import Dropdown from '../SearchContainer/Dropdown';

import './style.scss';

interface SearchContainerProps {
    updateAnimals: (animalType: string) => void
}

const SearchContainer: React.FC<SearchContainerProps> = (props) => {

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    }
    return (
        <div id="search-container">
            <Dropdown updateAnimals={props.updateAnimals}/>
        </div>
    )
}
export default SearchContainer;