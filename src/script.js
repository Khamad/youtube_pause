chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log('Request: ' + request.action);
  	switch(request.action) {
  		case 'play':
  			play();
  			sendResponse({status: 'Playing', pausedTab: null});
  			break;
  		case 'pause':
  			pause();
  			sendResponse({status: 'Pausing', pausedTab: request.tab});
  			break;
  	}
  });

function play() {
	document.getElementsByTagName('video')[0].play();
}

function pause() {
	document.getElementsByTagName('video')[0].pause();
}