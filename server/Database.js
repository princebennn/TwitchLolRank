"use strict"
var mysql = require('mysql');
var Promise = require('bluebird');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

class Database
{
    constructor() {
	this._pool = mysql.createPool({
	    connectionLimit : 10,
	    host     : 'YOUR_DB_HOST',
	    user     : 'YOUR_DB_USER',
	    password : 'YOUR_DB_PASSWORD',
	    port : '3306',
	    database: 'twitchlolrank'
	});
    }

    getPool()
    {
	return (this._pool);
    };

    addTwitchUser(username, email, twitchId)
    {
	var query = `INSERT INTO twitch_users (username, email, twitch_id) VALUES (\'${username}\', \'${email}\', \'${twitchId}\')`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
		.catch(function(err) {
		    if (err.code == 'ER_DUP_ENTRY')
			throw 'EXIST';
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    getTwitchUser(id)
    {
	var query = `SELECT * FROM twitch_users WHERE id=${id}`;
	console.log(query);
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result[0]);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    getTwitchUserByName(username)
    {
	var query = `SELECT * FROM twitch_users WHERE username=\'${username}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
		.catch(function(err) {
		    console.log(err);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    getLolAccountByTwitchUserId(twitchUserId)
    {
	var query = `SELECT * FROM lol_accounts WHERE twitch_user_id=${twitchUserId}`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    getLolAccountByUrlHash(urlHash)
    {
	var query = `SELECT * FROM lol_accounts WHERE url_hash=\'${urlHash}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

	addLolAccount(summonerId, username, urlHash, region)
    {
    	var query = `INSERT INTO lol_accounts (summoner_id, username, url_hash, region) VALUES (\'${summonerId}\', \'${username}\', \'${urlHash}\', \'${region}\')`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
		.then(function(result) {
		    return (result);
		})
		.catch(function(err) {
		    if (err.code == 'ER_DUP_ENTRY')
			throw false;
		})
		.finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

	addLolAccountRank(summonerId, queue, rank, league_points, division)
    {
    	var query = `INSERT INTO lol_accounts_ranks (summoner_id, queue, rank, league_points, division)
	VALUES (\'${summonerId}\', \'${queue}\', \'${rank}\', ${league_points}, ${division})`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
		    .then(function(result) {
			return (result);
		    })
		    .finally(function(result) {
			connection.release();
			return (result);
		    });
	});
    }

    getLolRanksIn(summonerIds)
    {
	var query = `SELECT * FROM lol_accounts_ranks WHERE summoner_id IN (\'${summonerIds.join('\', \'')}\')`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    getLolRanks(summonerId)
    {
	var query = `SELECT * FROM lol_accounts_ranks WHERE summoner_id=\'${summonerId}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    removeLolAccountRanks(summonerId)
    {
	var query = `DELETE FROM lol_accounts_ranks WHERE summoner_id=\'${summonerId}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    updateLolAccountTwitchUser(urlHash, twitchUserId)
    {
	var query = `UPDATE lol_accounts SET twitch_user_id=\'${twitchUserId}\' WHERE url_hash=\'${urlHash}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    updateLolAccountUrlHash(summonerId, urlHash)
    {
	var query = `UPDATE lol_accounts SET url_hash=\'${urlHash}\' WHERE summoner_id=\'${summonerId}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    removeLolAccountUrlHash(urlHash)
    {
	var query = `UPDATE lol_accounts SET url_hash=NULL WHERE url_hash=\'${urlHash}\'`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    getLolAccountToUpdate()
    {
	var query = `SELECT * FROM lol_accounts WHERE last_call_at > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 MINUTE) OR rank_update_at < DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY)`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }

    hasUpdatedLolAccount(id)
    {
	var query = `UPDATE lol_accounts SET rank_update_at=CURRENT_TIMESTAMP WHERE id=${id}`;
	return this._pool.getConnectionAsync().bind(this).then(function(connection) {
	    return connection.queryAsync(query)
	        .then(function(result) {
		    return (result);
		})
	        .finally(function(result) {
		    connection.release();
		    return (result);
		});
	});
    }
}

const DatabaseSingleton = new Database();
Object.freeze(DatabaseSingleton);

module.exports = DatabaseSingleton;
