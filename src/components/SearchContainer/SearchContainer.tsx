import React from 'react';
import Dropdown from '../SearchContainer/Dropdown';
import { useRecoilState } from 'recoil';
import { animalStateAtom } from '../../atoms';
import { getAnimals } from '../../api';
import './style.scss';

const SearchContainer: React.FC = () => {

    const [animals, setAnimals] = useRecoilState(animalStateAtom);
    const filters = {gender: 'any', type: 'cat', size: 'any', location: 'any'};

    function filterBy(filter: {action: string, value: string}) {
        setAnimals([]);
        switch(filter.action) {
            case 'type':
                getAnimals(filter.value==="Any" ? "" : "type=" + filter.value).then(animals => setAnimals((animals as [])));
                filters[filter.action] = filter.value;
                break;
            case 'gender':
                getAnimals(`type=${filters.type}&gender=${filter.value}`).then(animals => setAnimals((animals as [])));
                filters[filter.action] = filter.value;
                break;
            case 'size':
                getAnimals(`size=${filter.value}`).then(animals => setAnimals((animals as [])));
                filters[filter.action] = filter.value;
                break;
            default:
                break;
        }
    }
    
    return (
        <div id="search-container">
            <Dropdown  label={"size"} filterBy={filterBy} options={["Any", "Small", "Medium", "Large", "Extra Large"]}/>
            <Dropdown  label={"gender"} filterBy={filterBy} options={["Any", "Male", "Female"]}/>
            <Dropdown  label={"type"} filterBy={filterBy} options={["Any", "Dog", "Cat", "Horse", "Rabbit", "Barnyard"]}/>
        </div>
    )
}
export default SearchContainer;