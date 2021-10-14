const SET_APP_CLAIMS = 'app/SET_APP_CLAIMS';
const SET_APP_PLANS  = 'app/SET_APP_PLANS';

const appInitialState = {
    claims: null,
    plans: null
};

export default function appReducer(state = appInitialState, { payload, type } = {}) {
    switch (type) {
        case SET_APP_CLAIMS:
            return { ...state, claims: payload };
        case SET_APP_PLANS:
            return { ...state, plans: payload};
        default:
            return state;
    }
}

export function setAppClaims(payload) {
    return {
        type: SET_APP_CLAIMS,
        payload,
    };
}

export function setAppPlans(payload) {
    return {
        type: SET_APP_PLANS,
        payload
    }
}