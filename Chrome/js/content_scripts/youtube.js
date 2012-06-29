// var jq = document.createElement('script');
// jq.setAttribute('type', 'text/javascript');
// jq.setAttribute('src', chrome.extension.getURL('/js/content_scripts/comm.js'));
// document.body.appendChild(jq);

$('#watch-actions').append('<button type="button" id="VideoPins" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
                                <span class="yt-uix-button-content">\
                                    <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
                                '</span>\
                            </button>');
//<span class="addto-label">VideoPins</span>\

$('#VideoPins').click(function(){
    /* do somtthing */
    var obj = new Object();
        obj.title = $('#eow-title').text().replace(/^\s+/,"").replace(/\n/,"");
        obj.src = window.location.href;

    chrome.extension.sendRequest({request: "openWindow", value: obj});
    return false;
});
