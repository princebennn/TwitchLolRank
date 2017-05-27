setTimeout(function() {
var b = document.getElementsByClassName("chat-lines")[0];
b.addEventListener("click", printRank);

function printRank(element)
{
    var twitchUsername = element.target.innerText;
    setTimeout(function() {
	var x = document.getElementsByClassName("moderation-card js-moderation-card ember-view")[0].getElementsByClassName("moderation-card__actions")[0];
	var a = document.createElement('a');
	var linkText = document.createTextNode("See on TwitchLolRank");
	a.appendChild(linkText);
	a.title = "TwitchLolRank";
	a.className = "button twitchlolrank-button";
	a.target = "_blank";
	a.href = "https://twitchlolrank.com/search/" + twitchUsername;
	x.appendChild(a);
    }, 500);
}
}, 2000);
