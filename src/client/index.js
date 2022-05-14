import axios from 'axios';

const createClient = () => {
    const baseUrl = 'http://localhost:5000';
    const axiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-type": "application/json"
        },
    });
    const calculate = async (data) => {
        const res = await axiosClient.post('/calculate', data, { timeoutErrorMessage: 'TOOO LONG' });
        return res.data;
    }
    return {
        calculate
    }
}
export default createClient;