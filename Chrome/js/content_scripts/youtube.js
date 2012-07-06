
$('#watch-actions').append(getEmbedButton());

$('#VideoPins_btn').click(function(){
    var obj = new Object();
        obj.title = $('#eow-title').text().trim();
        obj.type  = getType(window.location.href);
        obj.id    = getYoutubeId(window.location.href);

    chrome.extension.sendRequest({request: "openWindow", value: obj});
    return false;
});
