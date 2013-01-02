
$('#watch7-sentiment-actions').append('<span>'+getEmbedButton()+'</span>');
// $('#watch-actions').append(getEmbedButton());

$('#VideoPins_btn').click(function(){
    var obj = new Object();
        obj.title = $('#watch-headline-title span').text().trim();
        obj.type  = getType(window.location.href);
        obj.id    = getYoutubeId(window.location.href);

    chrome.extension.sendRequest({request: "openWindow", value: obj});
    return false;
});
