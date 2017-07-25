chrome.commands.onCommand.addListener(function(command) {
  switch(command) {
    case 'togglePlaying':
      togglePlaying();
      break;
  }
});

function togglePlaying() {
  getSavedTab(function(savedTab) {
    if (savedTab) {
      sendAction('play', savedTab);
      setSavedTab(null);
    } else {
      getPlayingTab(function(playingTab) {
        if (playingTab) {
          sendAction('pause', playingTab);
          setSavedTab(playingTab);
        }
      })
    }
  })
}

function sendAction(action, tab) {
  chrome.tabs.sendMessage(tab.id, {action: action}, function(response) {
    console.log(response.status);
  });
}

function getSavedTab(callback) {
  chrome.storage.local.get(function(items) {
    callback(items.tab);
  });
}

function getPlayingTab(callback) {
  chrome.tabs.query({audible: true}, function(tabs) {
    callback(tabs[0])
  });
}

function setSavedTab(tab) {
  chrome.storage.local.set({tab: tab});
}