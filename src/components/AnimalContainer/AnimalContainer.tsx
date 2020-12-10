import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import { getAnimals } from '../../api';
import SearchContainer from '../SearchContainer/SearchContainer';

import './style.scss';

interface AnimalRespData {
    id: number,
    name: string,
    type: string,
    breeds: {primary: string},
    age: string,
    gender: string,
    size: string,
    description: string,
    photos: object[],
    contact: {
        address: {
            address1: string,
            city: string,
            country: string,
            state: string
        },
        email: string,
        phone: string
    }
}

const AnimalCardContainer: React.FC = () => {
    
    const [animals, setAnimals] = useState<AnimalRespData[]>([]);

    function updateAnimals(animalType: string) {
        getAnimals(animalType).then(data => setAnimals(data.animals));
    }
    
    useEffect(() => {updateAnimals("dog")}, []);

    return (
        <div id="wrapper">
        <SearchContainer updateAnimals={updateAnimals}/>
        <div id="animal-card-container">
            {
                animals.map(animal=> {
                    if (animal.photos.length > 1 && animal.description) {
                        return <AnimalCard key={animal.id} animal={animal}/>
                    }
                })
            }
        </div>
        </div>
    )
}
export default AnimalCardContainer;