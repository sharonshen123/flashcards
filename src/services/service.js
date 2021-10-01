import axios from 'axios'

const APIURL = 'http://sharon.bdxonline.com:5000/'
const Services = {
    getAllData() {
        return axios
            .get(APIURL + '/getData')
    },
    filterBy(filterOptions) {
        return axios
            .post(APIURL + '/filterBy', filterOptions)
    },
    checkUserCache() {
        const userInfo = localStorage.getItem('userInfo') ?? '';
        return userInfo.length > 0;
    }
}


export default Services;