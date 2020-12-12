import { atom } from 'recoil';

export const animalStateAtom = atom({
    key: 'animals',
    default: []
})

export const filtersAtom = atom({
    key: 'filters',
    default: {gender: 'male,female', type: 'dog', size: 'small,medium,large,xlarge', location: '40.712776,-74.005974', page:1}
})