import axios from "axios"
// get token from the http only cookie in production
// Token will change each time login happen in production
const token ="Bearer " + window.localStorage.getItem("JWT");
export default axios.create({
    headers: {Authorization: token },
    baseURL : process.env.REACT_APP_API_HOST,
})