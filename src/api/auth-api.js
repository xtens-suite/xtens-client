import axios from 'axios';

export async function logIn(credentials) {
    const { login, password } = credentials;
    const response = await axios.post('/api/login', {
        identifier: login,
        password: password
    });
    return response;
}
