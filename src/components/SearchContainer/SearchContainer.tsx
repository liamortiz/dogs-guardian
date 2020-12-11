import React, { useEffect } from 'react';
import Dropdown from '../SearchContainer/Dropdown';
import { useRecoilState } from 'recoil';
import { animalStateAtom, filterStateAtom } from '../../atoms';
import { getAnimals } from '../../api';
import './style.scss';

const SearchContainer: React.FC = () => {

    const [animals, setAnimals] = useRecoilState(animalStateAtom);
    const [filters, setFilters] = useRecoilState(filterStateAtom);

    function filterBy(filter: {action: string, value: string}) {
        switch(filter.action) {
            case 'Type':
                getAnimals("page=1&limit=100&type=" + filter.value).then(data => setAnimals(data.animals));
                setFilters({...filters, type: filter.value})
                break;
            case 'Gender':
                getAnimals(`page=1&limit=100&type=${filters.type}&gender=${filter.value}`).then(data => setAnimals(data.animals));
                break;
            default:
                break;
        }
    }
    
    return (
        <div id="search-container">
            <Dropdown  label={"Gender"} filterBy={filterBy} options={["Male", "Female"]}/>
            <Dropdown  label={"Type"} filterBy={filterBy} options={["Dog", "Cat", "Horse", "Rabbit", "Barnyard"]}/>
            <Dropdown  label={"Size"} filterBy={filterBy} options={["Small (0-25 lbs)", "Medium (26-60 lbs)", "Large (61-100 lbs)", "Huge(101 lbs+)"]}/>
        </div>
    )
}
export default SearchContainer;