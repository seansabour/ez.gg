import * as api from '../utils/helpers';

export const SUMMONER_LOOKUP_REQUESTED = 'SUMMONER_LOOKUP_REQUESTED';
export const SUMMONER_LOOKUP_SUCCESS = 'SUMMONER_LOOKUP_SUCCESS';
export const SUMMONER_LOOKUP_FAILED = 'SUMMONER_LOOKUP_FAILED';
export const FETCHING_DATA = 'FETCHING_DATA';
export const HIDE_ERROR_MESSAGES = 'HIDE_ERROR_MESSAGES';
export const CLEAR_CURRENT_SUMMONER = 'CLEAR_CURRENT_SUMMONER';
export const BOOKMARK_SUMMONERS_RECEIVED = 'BOOKMARK_SUMMONERS_RECEIVED';

const VALID_SUMMONER_NAME = /^[0-9a-zA-Z _\.]+$/i;

const fetchingData = () => ({
    type: FETCHING_DATA,
    isFetching: true
});

const summonerLookupSuccess = data => ({
    type: SUMMONER_LOOKUP_SUCCESS,
    data
});
export const clearCurrentSummoner = () => ({
    type: CLEAR_CURRENT_SUMMONER
});

const summonerLookupFailure = data => ({
    type: SUMMONER_LOOKUP_FAILED,
    error: data.error
});

export const hideErrorMessages = () => ({
    type: HIDE_ERROR_MESSAGES
});

const bookmarksReceived = summoners => ({
    type: BOOKMARK_SUMMONERS_RECEIVED,
    summoners
});

export const bookmarkSummoner = summoner => dispatch => {
    console.log(`In action.. ${JSON.stringify(summoner)}`);
    return api.bookmarkSummoner(summoner).then(res => {
        console.log(`In callback.. : ${JSON.stringify(res)}`);
        dispatch(bookmarksReceived(res));
    });
};
export const getBySummonerName = name => dispatch => {
    if (VALID_SUMMONER_NAME.test(name)) {
        dispatch(fetchingData());
        return api
            .getBySummonerName(name)
            .then(data => {
                if (data.error) {
                    return dispatch(summonerLookupFailure(data));
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
