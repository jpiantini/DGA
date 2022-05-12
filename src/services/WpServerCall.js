import axios from 'axios';

export default function wpCall() {
    return axios.create({
        baseURL: 'https://wp.servicios.mitur.gob.do/wp-json',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 60000,
    });
}

