import * as actionType from '../actions';

const initialState = {
    data: [],
    error: '',
    isFetching: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SUMMONER_LOOKUP_FAILED:
            console.log(`Reducer failed.`);
            return { ...state, error: action.error, isFetching: false };
        case actionType.SUMMONER_LOOKUP_SUCCESS:
            console.log(`LOOKUP SUCCESS`);
            return { ...state, data: action.data };
        case actionType.FETCHING_DATA:
            return { ...state, isFetching: true };

        default:
            return state;
    }
};

export default rootReducer;
