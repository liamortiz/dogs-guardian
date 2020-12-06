import { clientID, clientSecret } from './credentials';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const AUTH_URL = "https://api.petfinder.com/v2/oauth2/token";
const DOGS_URL = "https://api.petfinder.com/v2/animals?type=dog";

interface ResponseTokenData {
    token: string,
    expires_in: number,
    access_token: string
}

interface ResponseError {
    "type": string,
    "status": number,
    "title": string,
    "detail": string,
    "invalid-params": any
}

const tokenRequestBody = {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}

function setToken() : void {
    fetch(AUTH_URL, tokenRequestBody)
    .then(resp => resp.json())
    .then(data => {
        cookies.set('token', data.access_token, { path: '/'});
    })
}

export function auth() {
    if (!cookies.get('token')) {
        setToken();
    }
}