import axios, {AxiosInstance} from 'axios';

// .env 파일에 담아야 할까요
const SERVER = 'https://k7b103.p.ssafy.io/api/v1/';

export const customAxios = axios.create({
    baseURL: `${SERVER}`
});