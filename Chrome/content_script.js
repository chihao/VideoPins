
//$('#eow-title').click(function() { popup(); });

$('#watch-actions').append('<button type="button" id="VideoPins" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="置頂" data-tooltip-text="置頂"><span class="yt-uix-button-content"><span class="addto-label">VideoPins</span></span></button>');
$('#VideoPins').click(function(){
    /* do somtthing */
    popup();
    return false;
});

function popup()
{
    var obj = new Object();
    obj.title = $('#eow-title').text().replace(/^\s+/,"").replace(/\n/,"");
    obj.x = 100;
    obj.y = 100;
    obj.width = $('#watch-player').width();
    obj.height = $('#watch-player').height();
    obj.html = $('#watch-player').html();
    //"<iframe width='420' height='315' src=\"http://www.youtube.com/embed/k0BWlvnBmIE\" frameborder='0' allowfullscreen></iframe>"

    chrome.extension.sendRequest({request: "openWindow", value: obj});
}