import React, { useEffect, useState } from 'react';
import DogCard from './AnimalCard';
import { getAnimals } from '../../api';

import './style.scss';

interface AnimalRespData {
    id: number,
    name: string,
    breeds: object,
    age: string,
    gender: string,
    size: string,
    description: string,
    photos: object[]
}

const DogCardContainer: React.FC = () => {

    const [animals, setAnimals] = useState<AnimalRespData[]>([]);

    function getDogs() {
        getAnimals('dog').then(data => setAnimals(data.animals));
    }

   useEffect(getDogs, []);

    return (
        <div id="animal-card-container">
            {
                animals.map(animal=> <DogCard key={animal.id} animal={animal}/>)
            }
        </div>
    )
}
export default DogCardContainer;