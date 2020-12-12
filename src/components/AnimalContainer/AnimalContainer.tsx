import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import { getAnimals } from '../../api';
import SearchContainer from '../SearchContainer/SearchContainer';
import { useRecoilState } from 'recoil';
import { animalStateAtom, filtersAtom } from '../../atoms';

import './style.scss';

const AnimalCardContainer: React.FC = () => {
    
    const [animals, setAnimals] = useRecoilState(animalStateAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFilters, setSearchFilters] = useRecoilState(filtersAtom);
    const [loadingNextPage, setLoadingNextPage] = useState(false);

    window.onscroll = autoFill;

    useEffect(() => {
        getAnimals(`sort=distance&type=${searchFilters.type}&location=${searchFilters.location}`)
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
        if (yPosition <= 400 && !loadingNextPage) {
            setLoadingNextPage(true);

            getAnimals(`sort=distance&size=${searchFilters.size}&type=${searchFilters.type}&location=${searchFilters.location}&gender=${searchFilters.gender}`, searchFilters.page + 1)
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
            {animals.map((animal, index) => <AnimalCard key={index} animal={animal}/>)}

        </div>
        </div>
    )
}
export default AnimalCardContainer;