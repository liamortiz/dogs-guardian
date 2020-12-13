import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import SearchContainer from '../SearchContainer/SearchContainer';
import { useRecoilState } from 'recoil';
import { animalStateAtom, filtersAtom } from '../../atoms';
import { getAnimals, setToken } from '../../api';

import './style.scss';

const AnimalCardContainer: React.FC = () => {
    
    const [animals, setAnimals] = useRecoilState(animalStateAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFilters, setSearchFilters] = useRecoilState(filtersAtom);
    const [loadingNextPage, setLoadingNextPage] = useState(false);

    useEffect(() => {
        setToken().then(token => {
            getAnimals(`sort=distance&type=${searchFilters.type}&location=${searchFilters.location}`)
            .then(animals => setAnimals((animals as [])))
        })
    }, [])

    useEffect(() => {
        if (animals.length === 0 && !isLoading) {
            setIsLoading(true);
        } else if (animals.length !== 0 && isLoading) {
            setIsLoading(false);
        }
    },[animals])

    function loadMoreResults() {
        if (loadingNextPage) return;
        setLoadingNextPage(true);

        getAnimals(`sort=distance&size=${searchFilters.size}&type=${searchFilters.type}&location=${searchFilters.location}&gender=${searchFilters.gender}`, searchFilters.page + 1)
        .then(a => {
            setAnimals(animals.concat((a as [])));
            setLoadingNextPage(false);
            setSearchFilters({...searchFilters, page: searchFilters.page + 1});
            })
    }

    return (
        <div id="wrapper">
        <SearchContainer/>
            <div id="animal-card-container">
                {isLoading && <div className="loader"></div>}
                {animals.map((animal, index) => <AnimalCard key={index} animal={animal}/>)}
            </div>
            {(!isLoading && !loadingNextPage) && <button className="load-more-btn" onClick={loadMoreResults}>Load More</button>}
        </div>
    )
}
export default AnimalCardContainer;