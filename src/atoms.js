import { atom } from 'recoil';

export const animalStateAtom = atom({
    key: 'animals',
    default: []
})
export const filterStateAtom = atom({
    key: 'filters',
    default: {gender: 'any', type: 'cat', size: 'any', location: 'any'}
})