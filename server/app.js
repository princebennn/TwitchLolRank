var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var CronJob = require('cron').CronJob;

var LolChatManager = require('./LolChatManager.js');
var TwitchLolRank = require('./TwitchLolRank.js');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('trust proxy', 2);

app.get('/', function (req, res) {
    res.send('You shall not pass !!!');
});

app.get('/users/:name', function (req, res) {
    TwitchLolRank.getTwitchUser(req.params.name)
        .then(function(data) {
	    res.send(JSON.stringify(data));
	})
	.catch(function(err) {
	    console.log(err);
	    res.status(500).send('Error');
	});;
});

app.post('/users', function (req, res) {
    if (!req.body.twitch_access_token)
	res.status(400).send('Send twitch access token parameter');
    TwitchLolRank.addTwitchUser(req.body.twitch_access_token)
        .then(function() {
	    res.send('Added successfully ;)');
	})
        .catch(function(err) {
	    console.log(err);
	    res.status(500).send('Error');
	});
});

/*app.post('/lol_account', function (req, res) {
    if (!req.body.region)
	res.status(400).send('Send region parameter');
    if (!req.body.summoner_id)
	res.status(400).send('Send summoner id parameter');
    TwitchLolRank.addTwitchUser(req.body.twitch_access_token)
        .then(function() {
	    res.send('Added successfully ;)');
	})
        .catch(function(err) {
	    console.log(err);
	    res.status(500).send('Error');
	});
});*/

app.get('/claim/:url_hash/:twitch_code', function(req, res) {
    TwitchLolRank.addTwitchUser(req.params.twitch_code).then(function(twitchUser) {
	console.log(twitchUser);
	return TwitchLolRank.claimLolAccount(req.params.url_hash, twitchUser.id)
            .then(function(data) {
		var data = {username: twitchUser.username};
		res.send(JSON.stringify(data));
	    })
    })
	.catch(function(err) {
	    console.error(err);
	    res.status(400).send(err);
	});
});

TwitchLolRank.addLolAccount('EUW', '90501570');
TwitchLolRank.addLolAccount('EUW', '33429226');

//var chats = new LolChatManager();

new CronJob("0 */30 * * * *", function(){
    TwitchLolRank.refreshAllRanks();
}, null, true);

new CronJob("0 */5 * * * *", function(){
    chats = new LolChatManager();
}, null, true);


app.listen(process.env.PORT || 3000, function () {
    var port = process.env.PORT ? process.env.PORT : '3000';
    console.log('API TwitchLolRank listening on port ' + port + ' !');
});
