import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-bb214.firebaseio.com/'
});

export default instance;