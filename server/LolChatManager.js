var LolChat = require('./LolChat.js');

class LolChatManager
{

    constructor()
    {
	this.chats = [];
	this.chats.push(new LolChat('BR'));
	this.chats.push(new LolChat('NA'));
	this.chats.push(new LolChat('EUW'));
	this.chats.push(new LolChat('EUNE'));
	this.chats.push(new LolChat('TR'));
	this.chats.push(new LolChat('RU'));
	this.chats.push(new LolChat('LAN'));
	this.chats.push(new LolChat('LAS'));
	this.chats.push(new LolChat('OCE'));
    }
}

module.exports = LolChatManager;
