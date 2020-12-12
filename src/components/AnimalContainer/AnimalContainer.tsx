import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import { getAnimals } from '../../api';
import SearchContainer from '../SearchContainer/SearchContainer';
import { useRecoilState } from 'recoil';
import { animalStateAtom, filtersAtom } from '../../atoms';

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
    const [searchFilters, setSearchFilters] = useRecoilState(filtersAtom);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    
    window.onscroll = autoFill;

    useEffect(() => {
        getAnimals(`type=${searchFilters.type}&location=${searchFilters.location}`)
        .then(animals => setAnimals((animals as [])))
    },[]);

    useEffect(() => {
        if (animals.length === 0 && !isLoading) {
            setIsLoading(true);
        } else if (animals.length !== 0 && isLoading) {
            setIsLoading(false);
        }
    },[animals])


    function autoFill() {
        const yPosition = document.body.scrollHeight - document.documentElement.scrollTop - window.innerHeight;
        if (yPosition <= 0 && !loadingNextPage) {
            setLoadingNextPage(true);

            getAnimals(`size=${searchFilters.size}&type=${searchFilters.type}&location=${searchFilters.location}&gender=${searchFilters.gender}`, searchFilters.page + 1)
            .then(a => {
                setAnimals(animals.concat((a as [])));
                setLoadingNextPage(false);
                setSearchFilters({...searchFilters, page: searchFilters.page + 1});
            })
        }   
    }

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