import axios from "axios";

const setAuthheader = (token) => {
    if(token){
        axios.defaults.headers = {
            Authorization: "Bearer " + token,

        }
    } else {
        delete axios.defaults.headers.Authorization;
    }
}

export default setAuthheader;