import React, { useEffect } from 'react';
import AnimalCard from './AnimalCard';
import { getAnimals } from '../../api';
import SearchContainer from '../SearchContainer/SearchContainer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { animalStateAtom, filterStateAtom } from '../../atoms';

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
    const currentFilter = useRecoilValue(filterStateAtom);

    useEffect(() => {
        getAnimals(`page=1&limit=100&type=${currentFilter.type}`)
        .then(data => setAnimals(data.animals))
    },[]);

    return (
        <div id="wrapper">
        <SearchContainer/>
        <div id="animal-card-container">
            {
                animals.map(animal=> {
                    if ((animal as AnimalRespData).photos.length > 1 && (animal as AnimalRespData).description) {
                        return <AnimalCard key={(animal as AnimalRespData).id} animal={animal}/>
                    }
                    return null;
                })
            }
        </div>
        </div>
    )
}
export default AnimalCardContainer;