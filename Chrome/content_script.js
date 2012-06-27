
$('#watch-actions').append('<button type="button" id="VideoPins" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
                                <span class="yt-uix-button-content">\
                                    <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
                                '</span>\
                            </button>');
//<span class="addto-label">VideoPins</span>\

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
    obj.html = getYoutubeEmbedLink(window.location.href);
    //obj.html = $('#watch-player').html();

    chrome.extension.sendRequest({request: "openWindow", value: obj});
}

function getYoutubeEmbedLink(url)
{    
    //"<iframe width='420' height='315' src=\"http://www.youtube.com/embed/k0BWlvnBmIE\" frameborder='0' allowfullscreen></iframe>"
    var ret = '<iframe src="http://www.youtube.com/embed/'+getYoutubeId(url)+'" frameborder allowfullscreen></iframe>';
    return ret;
}

function getYoutubeId(url)
{
    if (/^https?\:\/\/.+/i.test(url)) {
        var temp = /[\?\&]v=([^\?\&]+)/.exec(url);
        if (temp) {
            return temp[1];
        } else {
            return null;
        }
    } else {
        // other case left as an exercise
    }
}

/* open button */
/*
var a = document.createElement('a');
a.id   = 'videopins_pin';
a.href = 'javascript:alert($("iframe[src*=youtube]").attr("src"));';
a.title = chrome.i18n.getMessage('tooltip');
a.style.display  = 'block';
a.style.width    = '32px';
a.style.height   = '32px';
a.style.overflow = 'hidden';
a.style.zIndex   = '999';
a.style.position = 'fixed';
a.style.top      = '260px';
a.style.right    = '0';
a.style.background = 'url('+chrome.extension.getURL('/images/icon32.png')+') no-repeat';
document.body.appendChild(a);

alert($("iframe[src*=youtube]").attr("src"));
*/

/* get Youtube video id */
// var text = (
// "http://www.youtube.com/watch?v=gzDS-Kfd5XQ\n" +
// "http://www.youtube.com/watch?v=gzDS-Kfd5XQ&feature=youtube_gdata_player\n" +
// "http://www.youtube.com/watch?feature=youtube_gdata_player&v=gzDS-Kfd5XQ\n" +
// "http://www.youtube.com/watch?v=gzDS-Kfd5XQ http://www.youtube.com/watch?v=gzDS-Kfd5XQ"
// ).split(/\s+/);
// for (var i = 0; i < text.length; i++) {
//     var url = text[i];
//     if (/^https?\:\/\/.+/i.test(url)) {
//         var temp = /[\?\&]v=([^\?\&]+)/.exec(url);
//         if (temp) {
//             text[i] = '[youtube=' + temp[1] + ']';
//         } else {
//             text[i] = "URL found but does not contain video id";
//         }
//     } else {
//         // other case left as an exercise
//     }
// }
// alert(text.join('\n'));