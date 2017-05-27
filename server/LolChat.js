var Client = require('./server-lol-chat/index.js');

var TwitchLolRank = require('./TwitchLolRank.js');

const LOL_LOGIN = 'twitchlolrank';
const LOL_PASS = 'YOUR_LOL_BOT_PASSWORD';

class LolChat
{

    constructor(region)
    {
	this.region = region.toUpperCase();
	this.client = new Client({
	    accountName: LOL_LOGIN,
	    password: LOL_PASS,
	    server: region
	});
	this.client.lolchat = this;
	this.client.on("online", function() {
	    console.log(`Connected to ${this.lolchat.region}`);
	});

	this.client.on("offline", function () {
	    console.log(`Disconnected from ${this.lolchat.region}`);
/*	    this.lolchat.client = new Client({
		accountName: LOL_LOGIN,
		password: LOL_PASS,
		server: this.lolchat.region
	    });*/

	});

	this.client.on("new_friend", function(friend)
	{
	    this.addFriend(friend.split('/')[0]);
	    var summonerId = friend.substring(3,friend.lastIndexOf("@"));
	    var myClient = this;
	    TwitchLolRank.addLolAccount(this.lolchat.region, summonerId).then(function(claimUrl) {
		myClient.sendMessage(friend, claimUrl);
		myClient.removeFriend(friend.split('/')[0]);
		console.log(myClient.getFriendlist());
	    });
	});

	this.client.on("error", function(err) {
/*	    this.lolchat.client = new Client({
		accountName: LOL_LOGIN,
		password: LOL_PASS,
		server: this.lolchat.region
	    });*/
	});

	this.client.on("message", function (message) {
	    console.log(message);
	    var summonerId = message.from.substring(3,message.lastIndexOf("@"));
	    TwitchLolRank.addLolAccount(this.lolchat.region, summonerId).then(function(claimUrl) {
		this.sendMessage(message.from, message.body);
	    });
	});
    }

    close() {
	this.client.disconnect();
    }
}

module.exports = LolChat;
