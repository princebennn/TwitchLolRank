console.log('OK DK');


var observer;
var chatLines;
var chatClickListener;
var chatEventInit = false;

function getUserRank(pseudo) {
  chrome.runtime.sendMessage({
    function: "getUser",
    pseudo: pseudo
  }, function(response) {
    console.log(response.farewell);
  });
  return Api.getUser(pseudo).then(function(data) {
      var user = data;
      var url = '';
      user.ranks.forEach(function(rank) {
        if (rank['queue'] == 'RANKED SOLO 5x5')
          url = 'http://www.lolking.net/images/medals/' + rank['league_points'] + '_' + rank['division'] + '.png';
      });
      ranksArray[pseudo] = url;
      return url;
    })
    .catch(function(url) {
      ranksArray[pseudo] = url;
      return url;
    });
};

function onPseudoClick(element) {
  var twitchUsername = element.target.innerText;
  setTimeout(function() {
    var x = document.getElementsByClassName('moderation-card js-moderation-card ember-view')[0].getElementsByClassName('moderation-card__actions')[0];
    var a = document.createElement('a');
    var linkText = document.createTextNode('See on TwitchLolRank');
    a.appendChild(linkText);
    a.title = 'TwitchLolRank';
    a.className = 'button twitchlolrank-button';
    a.target = '_blank';
    a.href = 'https://twitchlolrank.com/search/' + twitchUsername;
    x.appendChild(a);
  }, 500);
}

function initPseudoClickListener() {
  chatLines = document.getElementsByClassName('chat-lines')[0];
  chatClickListener = chatLines.addEventListener('click', onPseudoClick);
};

function onChatMutation(mutations) {
  var mutation = mutations[0];
  if (mutation.target && mutation.target.children && mutation.target.children.length > 0) {
    var newMsg = mutation.target.children[mutation.target.children.length - 1];
    if (newMsg && newMsg.getElementsByClassName('from').length > 0) {
      var pseudo = newMsg.getElementsByClassName('from')[0].innerText;
      console.log(pseudo);
      getUserRank(pseudo, newMsg);
    }
  }
}

function initChatObserver() {

  var target = document.getElementsByClassName('chat-lines')[0];
  observer = new MutationObserver(onChatMutation);
  var config = {
    childList: true,
    subtree: false
      //    characterData: true
  };
  observer.observe(target, config);
};

function reload() {
  if (chatEventInit) {
    chatLines.removeEventListener('click', chatClickListener);
    observer.disconnect();
    chatEventInit = false;
    chatClickListener = null;
    chatLines = null;
    observer = null;
  }
  initAll();
}

function initLinkEvents() {
  var links = document.body.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', reload);
  }
}

function initAll() {
  setTimeout(function() {
    if (document.getElementsByClassName('chat-lines').length != 0) {
      chatEventInit = true;
      initPseudoClickListener();
      initChatObserver();
    } else {
      initAll();
    }
    initLinkEvents();
  }, 2000);
}

initAll();
