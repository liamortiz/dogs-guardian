import { clientID, clientSecret } from './credentials';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const AUTH_URL = "https://api.petfinder.com/v2/oauth2/token";
const BASE_URL = "https://api.petfinder.com/v2/animals?";

interface ResponseTokenData {
    token: string,
    expires_in: number,
    access_token: string
}

const tokenRequestBody = {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}

export async function setToken() {
    console.log("Authenticating..");
    const token = await fetch(AUTH_URL, tokenRequestBody)
    .then(resp => resp.json())
    .then((data: ResponseTokenData) => {
        cookies.set('token', data.access_token, { path: '/'});
        return data.access_token;
    })
    return token;
}

function filterAnimals(animals: {description: string, photos: []}[]) {
    return animals.filter(animal => animal.description && animal.photos.length > 1);
}

export async function getAnimals(params: string, page: number=1) {
    const resp = await fetch(`${BASE_URL}${params}&page=${page}&limit=20&sort=recent`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${cookies.get('token')}`}
    })
    .then(resp => resp.json())
    return filterAnimals(resp.animals);
}
