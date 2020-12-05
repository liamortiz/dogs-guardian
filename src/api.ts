import { clientID, clientSecret } from './credentials';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default async function setToken() {

    if (cookies.get('token')) {
        console.info("Skipping validation, token found");
        return;
    }

    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    response.json().then(data => {
        cookies.set('token', data.access_token, { path: '/'});
    });
}