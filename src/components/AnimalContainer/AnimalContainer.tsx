import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import { getAnimals } from '../../api';
import SearchContainer from '../SearchContainer/SearchContainer';

import './style.scss';

interface AnimalRespData {
    id: number,
    name: string,
    type: string,
    breeds: object,
    age: string,
    gender: string,
    size: string,
    description: string,
    photos: object[]
}

const AnimalCardContainer: React.FC = () => {
    
    const [animals, setAnimals] = useState<AnimalRespData[]>([]);

    function updateAnimals(animalType: string) {
        getAnimals(animalType).then(data => setAnimals(data.animals));
    }
    
    //console.log(animals)

    useEffect(() => {updateAnimals("dog")}, []);

    return (
        <div id="wrapper">
        <SearchContainer updateAnimals={updateAnimals}/>
        <div id="animal-card-container">
            {
                animals.map(animal=> {
                    if (animal.photos.length && animal.description) {
                        return <AnimalCard key={animal.id} animal={animal}/>
                    }
                })
            }
        </div>
        </div>
    )
}
export default AnimalCardContainer;