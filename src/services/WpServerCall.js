import axios from 'axios';

export default function wpCall() {
    return axios.create({
        baseURL: 'http://159.223.159.18/wp-json',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 60000,
    });
}

