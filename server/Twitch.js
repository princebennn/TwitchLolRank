var axios = require('axios');
var Database = require('./Database.js');

const CLIENT_ID = 'YOUR_TWITCH_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_TWITCH_CLIENT_SECRET';
const ACCEPT_HEADER = 'apphtv.v3+json';

var instance = axios.create({
    baseURL: 'https://api.twitch.tv/kraken/',
    headers: {
	'Accept': ACCEPT_HEADER,
	'Client-ID': CLIENT_ID
    }
});

class Twitch
{
    static getUser(accessToken)
    {
	instance.defaults.headers.common['Authorization'] = `OAuth ${accessToken}`;
	return (
	    instance.get(`user`)
		.then(function (response) {
		    return (response.data);
		})
	);
    }

    static getUserByAuthCode(authCode)
    {
	var postData = {
	    client_id: CLIENT_ID,
	    client_secret: CLIENT_SECRET,
	    grant_type: 'authorization_code',
	    redirect_uri: 'https://twitchlolrank.com/claim',
	    code: authCode,
	    state: ''
	};
	return (
	    axios.post('https://api.twitch.tv/kraken/oauth2/token', postData)
		.then(function (response) {
		    return Twitch.getUser(response.data.access_token);
		})
		    );
    }
}

module.exports = Twitch;
