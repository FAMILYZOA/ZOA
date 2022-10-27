import axios, {AxiosInstance} from 'axios';

// .env 파일에 담아야 할까요
const SERVER = 'http://127.0.0.1:8000';

export const customAxios = axios.create({
    baseURL: `${SERVER}`
});