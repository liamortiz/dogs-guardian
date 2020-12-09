import { clientID, clientSecret } from './credentials';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const AUTH_URL = "https://api.petfinder.com/v2/oauth2/token";
const GET_ANIMALS_URL = "https://api.petfinder.com/v2/animals?page=1&limit=100&type=";
const GET_ANIMAL_ID = "https://api.petfinder.com/v2/animals/"

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

function setToken() : void {
    fetch(AUTH_URL, tokenRequestBody)
    .then(resp => resp.json())
    .then((data: ResponseTokenData) => {
        cookies.set('token', data.access_token, { path: '/'});
    })
}

export async function getAnimals(type: string) {
    const resp = await fetch(GET_ANIMALS_URL + type, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${cookies.get('token')}`}
    })
    .then(resp => resp.json())
    .catch(() => {
        console.error("Failed to make API call, re-authenticating..");
        cookies.remove('token');
        auth();
        return {animals: []}
    });

    return resp;
}

export async function getAnimalById(id: number) {
    const resp = await fetch(GET_ANIMAL_ID + id, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${cookies.get('token')}`}
    })
    .then(resp => resp.json())
    .catch(() => {
        console.error("Failed to make API call, re-authenticating..");
        cookies.remove('token');
        auth();
        return {animals: []}
    });
    return resp;

}

export function auth() {
    if (!cookies.get('token')) {
        console.log("Authenticating..");
        setToken();
    }
}