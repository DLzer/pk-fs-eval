import axios from 'axios';

import { BASE_API } from "../constants";
import { setAppPlans } from "../state";

export function loadPlansData() {
    return (dispatch) => {
        return axios
            .get(`${BASE_API}/plans`)
            .then(response => {
                dispatch(setAppPlans(response.data.body.data))
            })
    }
}
