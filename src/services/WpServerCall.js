import axios from 'axios';

export default function wpCall() {
    return axios.create({
        baseURL: process.env.REACT_APP_WORDPRESS_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 60000,
    });
}

