chrome.commands.onCommand.addListener(function(command) {
	switch(command) {
		case 'togglePlaying':
			togglePlaying();
			break;
	}
});

var pausedTab = null

function togglePlaying() {
	chrome.tabs.query({audible: true}, function(tabs) {
		if (tabs.length > 0) {
			sendAction('pause', tabs[0])
		} else {
			if (pausedTab) {
				sendAction('play', pausedTab);
			}
		}
	});
}

function sendAction(action, tab) {
	chrome.tabs.sendMessage(tab.id, {action: action, tab: tab}, function(response) {
		pausedTab = response.pausedTab
		console.log(response.status);
	});
}