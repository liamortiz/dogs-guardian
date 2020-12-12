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
    {value: 'barnyard', label: 'Barnyard'},
    {value: 'small-furry', label: 'Small & Furry'},
    {value: 'scales-fins-other', label: 'Scales, Fins & Other'}
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
        setAnimals([]);

        const selectedOptions = (params.values as {value: string, label:string }[]);
        const values = selectedOptions.map(option => option.value).join(',');
        const newFilters = {...filters, [params.type]: values, page:1}

        const requestURL = `size=${newFilters.size}&type=${newFilters.type}&location=${newFilters.location}&gender=${newFilters.gender}`

        if (['type', 'gender', 'size'].includes(params.type)) {
            setFilters(newFilters);
            getAnimals(requestURL)
                    .then(animals => setAnimals((animals as [])));
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