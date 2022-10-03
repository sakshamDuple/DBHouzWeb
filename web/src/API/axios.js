import axiosi from "axios"
import { SERVER_LINK } from "./ServerLink";
// get token from the http only cookie in production
// Token will change each time login happen in production
const token ="Bearer " + window.localStorage.getItem("JWT");
export default axiosi.create({
    baseURL: SERVER_LINK,
    headers: {Authorization: token }
})