import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const LOL_API_KEY = 'RGAPI-6305bc0f-cc60-495d-8bb3-948c228ed232';
const LOL_NA_ENDPOINT = 'https://na1.api.riotgames.com';
const NAMESPACE = 'EZ.GG';
const options = {
    headers: {
        'X-Riot-Token': LOL_API_KEY,
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};
const validateResponse = (res, error) => {
    if (res.status === 200) {
        return res.json();
    } else {
        return { error };
    }
};

/*
 * getBySummonerName gets summoner data by name
 * Reference: https://developer.riotgames.com/api-methods/#summoner-v3/GET_getBySummonerName
 *
 */
export const getBySummonerName = summonerName => {
    return fetch(
        `${LOL_NA_ENDPOINT}/lol/summoner/v3/summoners/by-name/${summonerName}`,
        options
    )
        .then(res => validateResponse(res, 'Invalid summoner name'))
        .catch(err => err);
};

/*
 * getVersion gets version data for static data (I.E profile icons, loading screens, splash art)
 * Reference: https://developer.riotgames.com/api-methods/#lol-static-data-v3/GET_getVersions
 *
 */
export const getVersion = async () => {
    try {
        let versions = await AsyncStorage.getItem(`${NAMESPACE}::VERSIONS`);
        if (versions) {
            console.log(`Returning from AsyncStorage`);
            return JSON.parse(versions);
        } else {
            fetch(`${LOL_NA_ENDPOINT}/lol/static-data/v3/versions`, options)
                .then(res => validateResponse(res, 'Error getting versions'))
                .then(async versions => {
                    if (versions.error) {
                        return versions;
                    }
                    await AsyncStorage.setItem(
                        `${NAMESPACE}::VERSIONS`,
                        JSON.stringify(versions)
                    );
                    return versions;
                })
                .catch(err => err);
        }
    } catch (err) {
        return err;
    }
};

export const bookmarkSummoner = async summoner => {
    try {
        let summoners = await AsyncStorage.getItem(
            `${NAMESPACE}::BOOKMARKED_SUMMONERS`
        );
        if (summoners) {
            summoners = JSON.parse(summoners);
            console.log(
                `summoners ==> ${JSON.stringify(summoners)} and summoner ${
                    summoner.accountId
                }`
            );
            if (summoners[summoner.accountId]) {
                console.log(`Deleting from object..`);
                delete summoners[summoner.accountId];
            } else {
                console.log('adding to object..');
                summoners[summoner.accountId] = summoner;
            }

            await AsyncStorage.setItem(
                `${NAMESPACE}::BOOKMARKED_SUMMONERS`,
                JSON.stringify(summoners)
            );
            console.log(
                `Returning summoners from AsyncStorage ==> ${JSON.stringify(
                    summoners
                )}`
            );
            return summoners;
        } else {
            summoners = { [summoner.accountId]: summoner };

            await AsyncStorage.setItem(
                `${NAMESPACE}::BOOKMARKED_SUMMONERS`,
                JSON.stringify(summoners)
            );
            console.log(`Returning fresh obj ${JSON.stringify(summoners)}`);
            return summoners;
        }
    } catch (err) {
        return err;
    }
};
