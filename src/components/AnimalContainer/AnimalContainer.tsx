import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import { getAnimals } from '../../api';
import SearchContainer from '../SearchContainer/SearchContainer';
import { useRecoilState } from 'recoil';
import { animalStateAtom } from '../../atoms';

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
    
    const [animals, setAnimals] = useRecoilState(animalStateAtom);
    const [isLoading, setIsLoading] = useState(true);

    // Status 400 Invalid Params

    useEffect(() => {
        getAnimals("type=dog")
        .then(animals => setAnimals((animals as [])))
    },[]);

    useEffect(() => {
        if (animals.length === 0 && !isLoading) {
            setIsLoading(true);
        } else if (animals.length !== 0 && isLoading) {
            setIsLoading(false);
        }
    },[animals])

    return (
        <div id="wrapper">
        <SearchContainer/>
        <div id="animal-card-container">
            {isLoading && <div className="loader"></div>}
            
            {animals.map(animal => <AnimalCard key={(animal as AnimalRespData).id} animal={animal}/>)}

            {!animals &&
                <div className="no-results">
                    <h1>No Results</h1>
                </div>
            }
        </div>
        </div>
    )
}
export default AnimalCardContainer;