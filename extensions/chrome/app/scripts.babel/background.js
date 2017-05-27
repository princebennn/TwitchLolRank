'use strict';

console.log('\'Alli \'Allo! Event Page');

var userArray = {};

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});



function getUser(pseudo) {
  if (userArray[pseudo])
    return userArray[pseudo];
  return undefined;
}

function addUser(pseudo, value) {
  userArray[pseudo] = value;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var rtn;
    if (request.function == 'getUser')
      rtn = getUser(request.pseudo);
    else (request.function == 'addUser')
      addUser(request.pseudo, request.value);
    sendResponse(rtn);
  });
