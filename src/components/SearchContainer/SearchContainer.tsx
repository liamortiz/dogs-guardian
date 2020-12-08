import React from 'react';
import Dropdown from '../SearchContainer/Dropdown';

import './style.scss';

interface SearchContainerProps {
    updateAnimals: (animalType: string) => void
}

const SearchContainer: React.FC<SearchContainerProps> = (props) => {
    return(
        <div id="search-container">
            <form>
                <input type="text"/>
                <button type="submit">Find</button>
            </form>
            <Dropdown updateAnimals={props.updateAnimals}/>
        </div>
    )
}
export default SearchContainer;