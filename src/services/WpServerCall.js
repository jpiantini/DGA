import axios from 'axios';

export default function wpCall() {
    return axios.create({
        //dev
        baseURL: 'http://159.223.159.18/wp-json',
        //production
        //baseURL: 'https://wp.servicios.mitur.gob.do/wp-json',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 60000,
    });
}

