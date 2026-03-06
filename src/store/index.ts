import axios from "axios";

// const token = localStorage.getItem('token')
axios.defaults.headers.common = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}

export default axios