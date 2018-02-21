import * as actionType from '../actions';

const initialState = {
    data: null,
    error: '',
    isFetching: false,
    bookmarked: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SUMMONER_LOOKUP_FAILED:
            return { ...state, error: action.error, isFetching: false };
        case actionType.SUMMONER_LOOKUP_SUCCESS:
            return { ...state, data: action.data, isFetching: false };
        case actionType.FETCHING_DATA:
            return { ...state, isFetching: true };
        case actionType.HIDE_ERROR_MESSAGES:
            return { ...state, error: '' };
        case actionType.CLEAR_CURRENT_SUMMONER:
            return { ...state, data: null };
        case actionType.BOOKMARK_SUMMONERS_RECEIVED:
            return { ...state, bookmarked: action.summoners };
        default:
            return state;
    }
};

export default rootReducer;
