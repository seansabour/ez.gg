import * as actionType from '../actions';

const initialState = {
    data: [],
    error: '',
    isFetching: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SUMMONER_LOOKUP_FAILED:
            return { ...state, error: action.error, isFetching: false };
        case actionType.SUMMONER_LOOKUP_SUCCESS:
            return { ...state, data: action.data };
        case actionType.FETCHING_DATA:
            return { ...state, isFetching: true };
        case actionType.HIDE_ERROR_MESSAGES:
            return { ...state, error: '' };
        default:
            return state;
    }
};

export default rootReducer;
