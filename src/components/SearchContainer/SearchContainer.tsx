import React from 'react';
import { useRecoilState } from 'recoil';
import { animalStateAtom, filtersAtom } from '../../atoms';
import { getAnimals } from '../../api';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import './style.scss';

const animalTypeOptions = [
    {value: 'dog', label: 'Dog'},
    {value: 'cat', label: 'Cat'},
    {value: 'bird', label: 'Bird'},
    {value: 'horse', label: 'Horse'},
    {value: 'rabbit', label: 'Rabbit'},
    {value: 'barnyard', label: 'Barnyard'}
]

const animalGenderOptions = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'}
]

const animalSizeOptions = [
    {value: 'small', label: 'Small'},
    {value: 'medium', label: 'Medium'},
    {value: 'large', label: 'Large'},
    {value: 'xlarge', label: 'xLarge'},
]

const animatedComponents = makeAnimated();

const SearchContainer: React.FC = () => {

    const [animals, setAnimals] = useRecoilState(animalStateAtom);
    const [filters, setFilters] = useRecoilState(filtersAtom);

    function filterBy(params: {type: string, values: any}) {
        
        if (!params.values) params.values = [];

        const selectedOptions = (params.values as {value: string, label:string }[]);
        const values = selectedOptions.map(option => option.value);
        const requestURL = values.join(',');

        setAnimals([]);

        switch(params.type) {
            case 'type':
                getAnimals(`size=${filters.size}&type=${requestURL}&location=${filters.location}&gender=${filters.gender}`)
                    .then(animals => setAnimals((animals as [])));
                
                setFilters({...filters, type: requestURL, page: 1})
                break;
            case 'gender':
                getAnimals(`size=${filters.size}&type=${filters.type}&location=${filters.location}&gender=${requestURL}`)
                    .then(animals => setAnimals((animals as [])));
                
                setFilters({...filters, gender: requestURL, page: 1})
                break;
            case 'size':
                getAnimals(`type=${filters.type}&location=${filters.location}&gender=${filters.gender}&size=${requestURL}`)
                    .then(animals => setAnimals((animals as [])));
                
                setFilters({...filters, size: requestURL, page: 1})
                break;
            default:
                break;
        }
    }
    
    return (
        <div id="search-container">
            <Select 
            onChange={(options) => {filterBy({type: 'type', values: [options]})}}
            options={animalTypeOptions} 
            defaultValue={[animalTypeOptions[0]]}
            name="colors"
            className="multi-select"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            components={animatedComponents}
            placeholder="Species"
            data-type="type"
            />

            <Select 
            onChange={(options) => {filterBy({type: 'gender', values: options})}}
            options={animalGenderOptions} 
            defaultValue={[animalGenderOptions[0], animalGenderOptions[1]]}
            isMulti
            name="colors"
            className="multi-select gender-select"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            components={animatedComponents}
            placeholder="Gender"
            data-type="gender"
            />

            <Select 
            onChange={(options) => {filterBy({type: 'size', values: options})}}
            options={animalSizeOptions} 
            defaultValue={animalSizeOptions}
            isMulti
            name="colors"
            className="multi-select"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            components={animatedComponents}
            placeholder="Size"
            data-type="size"
            />
        </div>
    )
}
export default SearchContainer;