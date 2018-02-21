import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const LOL_API_KEY = 'RGAPI-6305bc0f-cc60-495d-8bb3-948c228ed232';
const LOL_NA_ENDPOINT = 'https://na1.api.riotgames.com';
const options = {
    headers: {
        'X-Riot-Token': LOL_API_KEY
    }
};
export const summonerLookup = summonerName => {
    return fetch(
        `${LOL_NA_ENDPOINT}/lol/summoner/v3/summoners/by-name/${summonerName}`,
        options
    ).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            return { error: 'Invalid summoner name' };
        }
    });
};
