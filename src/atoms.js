import { atom } from 'recoil';

export const animalStateAtom = atom({
    key: 'animals',
    default: []
})