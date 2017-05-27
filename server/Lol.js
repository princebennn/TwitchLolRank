var axios = require('axios');
var Database = require('./Database.js');

const API_KEY = 'YOUR_LOL_API_KEY';
const API_URL = 'https://(region).api.pvp.net/api/lol/(region)/';


class Lol
{
    static getSummonerById(region, summonerId)
    {
	var api_url = API_URL.replace('(region)', region).replace('(region)', region);
	return (
	    axios.get(`${api_url}v1.4/summoner/${summonerId}?api_key=${API_KEY}`)
		.then(function (response) {
		    if (response.data == null)
			return (undefined);
		    return (response.data);
		})
		.catch(function (error) {
		    console.log(error);
		})
	);
    }

    static getRanks(region, summonerId)
    {
	var api_url = API_URL.replace('(region)', region).replace('(region)', region);
	return (
	    axios.get(`${api_url}v2.5/league/by-summoner/${summonerId}/entry?api_key=${API_KEY}`)
		.then(function (response) {
		    return (response.data);
		})
		.catch(function (error) {
		    console.log(error.response.status);
		    if (error.response.status != 404)
			console.error(error);
		    return ([]);
		})
	);
    }
}

module.exports = Lol;
