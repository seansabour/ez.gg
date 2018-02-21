import * as api from '../utils/helpers';

export const SUMMONER_LOOKUP_REQUESTED = 'SUMMONER_LOOKUP_REQUESTED';
export const SUMMONER_LOOKUP_SUCCESS = 'SUMMONER_LOOKUP_SUCCESS';
export const SUMMONER_LOOKUP_FAILED = 'SUMMONER_LOOKUP_FAILED';
export const FETCHING_DATA = 'FETCHING_DATA';
export const HIDE_ERROR_MESSAGES = 'HIDE_ERROR_MESSAGES';

const VALID_SUMMONER_NAME = /^[0-9a-zA-Z _\.]+$/i;

const fetchingData = () => ({
    type: FETCHING_DATA,
    isFetching: true
});

const summonerLookupSuccess = data => ({
    type: SUMMONER_LOOKUP_SUCCESS,
    data
});

const summonerLookupFailure = data => ({
    type: SUMMONER_LOOKUP_FAILED,
    error: data.error
});

export const hideErrorMessages = () => ({
    type: HIDE_ERROR_MESSAGES
});

export const summonerLookup = name => dispatch => {
    if (VALID_SUMMONER_NAME.test(name)) {
        dispatch(fetchingData());
        return api
            .summonerLookup(name)
            .then(data => {
                if (data.error) {
                    dispatch(summonerLookupFailure(data));
                }
                return dispatch(summonerLookupSuccess(data));
            })
            .catch(err => err);
    } else {
        return dispatch(
            summonerLookupFailure({ error: 'Invalid summoner name check.' })
        );
    }
};
