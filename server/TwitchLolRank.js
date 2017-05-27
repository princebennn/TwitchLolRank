var Database = require('./Database.js');
var Lol = require('./Lol.js');
var Twitch = require('./Twitch.js');
var Promise = require("bluebird");
var RandomString = require("randomstring");
var toArabic = require('roman-numerals').toArabic;

class TwitchLolRank
{

    static addLolAccount(region, summonerId)
    {
	var url_hash = summonerId + RandomString.generate(7);
	return Lol.getSummonerById(region, summonerId)
	    .then(function(summoner) {
		console.log(summoner[summonerId]);
		return Database.addLolAccount(summonerId, summoner[summonerId].name, url_hash, region)
		    .then(function(result) {
			TwitchLolRank.addRanks(region, summonerId);
			return ('https://twitchlolrank.com/claim/' + url_hash);
		    })
		    .catch(function(err) {
			if (err == false)
			    Database.updateLolAccountUrlHash(summonerId, url_hash);
			else
			    console.log(err);
			return ('https://twitchlolrank.com/claim/' + url_hash);
		    });
	    });
    }

    static getTwitchUser(username)
    {
	username = username.toLowerCase();
	var rtn = {};
	return Database.getTwitchUserByName(username)
	    .then(function(twitchUser) {
		if (twitchUser.length == 0)
		    throw 'NO_USER';
		twitchUser = twitchUser[0];
		rtn['twitchUsername'] = twitchUser.username;
		rtn['twitchId'] = twitchUser.twitch_id;
		return Database.getLolAccountByTwitchUserId(twitchUser.id)
		    .then(function(lolAccounts) {
			var summonerIds = [];
			rtn['lolAccounts'] = [];
			for (var i = 0; i < lolAccounts.length; i++)
			{
			    var lolAccount = lolAccounts[i];
			    var tmp = {};
			    summonerIds.push(lolAccount.summoner_id);
			    tmp['username'] = lolAccount.username;
			    tmp['region'] = lolAccount.region;
			    tmp['ranks'] = [];
			    tmp['summoner_id'] = lolAccount.summoner_id;
			    rtn['lolAccounts'].push(tmp);
			}
			return Database.getLolRanksIn(summonerIds)
			    .then(function(ranks) {
				for (var i = 0; i < ranks.length; i++)
				{
				    var rank = ranks[i];
				    var pushRank = {};
				    pushRank['queue'] = rank.queue;
				    pushRank['rank'] = rank.rank;
				    pushRank['league_points'] = rank.league_points;
				    pushRank['division'] = rank.division;
				    for (var j = 0; j < rtn['lolAccounts'].length; j++)
				    {
					var tmpLol = rtn['lolAccounts'][i];
					if (tmpLol['summoner_id'] == rank.summoner_id)
					    rtn['lolAccounts'][i]['ranks'].push(pushRank);
				    }
				}
				return rtn;
			    });
		    })
	    });
    }
    
    static addTwitchUser(twitchAuthCode)
    {
	return Twitch.getUserByAuthCode(twitchAuthCode)
	    .then(function(twitchUser) {
		return Database.addTwitchUser(twitchUser.name.toLowerCase(), twitchUser.email, twitchUser._id)
		    .then(function(response) {
			return Database.getTwitchUser(response.insertId);
		    })
		    .catch(function(err) {
			if (err == 'EXIST')
			{
			    return Database.getTwitchUserByName(twitchUser.name.toLowerCase())
				.then(function(result) {
				    return result[0];
				});
			}
		    });
	});
    }
    
    static claimLolAccount(urlHash, twitchUserId)
    {
	return Database.updateLolAccountTwitchUser(urlHash, twitchUserId)
	    .then(function(response) {
		Database.removeLolAccountUrlHash(urlHash);
		return response;
	    })
	    .catch(function(err) {
		console.log(err);
	    });
    }

    static refreshRanks(region, summonerId)
    {
	return Database.removeLolAccountRanks(summonerId)
	    .then(function() {
		return TwitchLolRank.addRanks(region, summonerId);
	    });
    }

    static refreshAllRanks()
    {
	return Database.getLolAccountToUpdate()
	    .then(function(result) {
		console.log(result);
		for (var i = 0; i < result.length; i++)
		{
		    var lolAccount = result[i];
		    TwitchLolRank.refreshRanks(lolAccount.region, lolAccount.summoner_id);
		}
	    });
    }
    
    static addRanks(region, summonerId)
    {
	return Lol.getRanks(region, summonerId)
	    .then(function(ranks) {
		ranks = ranks[summonerId];
		for (var i = 0; i < ranks.length; i++)
		{
		    var rank = ranks[i];
		    var queue = rank.queue.split('_').join(' ');
		    var ranked = rank.tier;
		    var division = toArabic(rank.entries[0].division);
		    var league_points = rank.entries[0].leaguePoints;
		    Database.addLolAccountRank(summonerId, queue, ranked, league_points, division);
		}
	    });
    }
}

module.exports = TwitchLolRank;
