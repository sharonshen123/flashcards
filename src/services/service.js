import axios from 'axios';

const API_URL = 'http://sharon.bdxonline.com:5000/'
const Services = {
    getAllData() {
        return axios
            .get(API_URL + '/getData')
    },
    filterBy(filterOptions) {
        return axios
            .post(API_URL + '/filterBy', filterOptions)
    },
    checkUserCache() {
        const userInfo = localStorage.getItem('userInfo') ?? '';
        return userInfo.length > 0;
    },
    filterForQuiz(filterOptions) { return axios.post(API_URL + '/filterForQuiz', filterOptions) },
}


export default Services;