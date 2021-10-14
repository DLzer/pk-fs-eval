import axios from 'axios';

import { BASE_API } from "../constants";
import { setAppClaims } from "../state";

export default function loadClaimsData() {
    return (dispatch) => {
        return axios
            .get(`${BASE_API}/claims`)
            .then(response => {
                dispatch(setAppClaims(response.data.body.data[0]))
            })
    }
}