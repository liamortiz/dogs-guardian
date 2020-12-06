import React from 'react';
import DogCard from './DogCard';

import './style.scss';

const DogCardContainer: React.FC = () => {
    return (
        <div id="dog-card-container">
            <DogCard name="Champ" image=""/>
        </div>
    )
}
export default DogCardContainer;