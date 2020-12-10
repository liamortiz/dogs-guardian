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
            <Dropdown label={"Gender"} updateAnimals={props.updateAnimals} options={["Male", "Female"]}/>
            <Dropdown label={"Type"} updateAnimals={props.updateAnimals} options={["Dog", "Cat", "Horse", "Rabbit", "Barnyard"]}/>
            <Dropdown label={"Size"} updateAnimals={props.updateAnimals} options={["Small (0-25 lbs)", "Medium (26-60 lbs)", "Large (61-100 lbs)", "Huge(101 lbs+)"]}/>
        </div>
    )
}
export default SearchContainer;