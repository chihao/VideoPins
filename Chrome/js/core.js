function getType(url)
{
    return '';
}

function getYoutubeEmbedLink(id)
{    
    var bg_page = chrome.extension.getBackgroundPage();

    var src = "http://www.youtube.com/embed/"+id;
    var ret = '<iframe id="ytplayer" type="text/html" \
                src="'+src+'?autohide=1#" \
                frameborder="0" allowfullscreen>';

    return ret;
}

function getYoutubeId(url)
{
    var reg = new RegExp('(?:https?://)?(?:www\\.)?(?:youtu\\.be/|youtube\\.com(?:/embed/|/v/|/watch\\?v=|.*&v=))([\\w-]{10,12})', 'g');
    // var reg = new RegExp('(?:https?://)?(?:www\\.)?(?:youtu\\.be/|youtube\\.com(?:/embed/|/v/|/watch\\?v=))([\\w-]{10,12})', 'g');
    var temp = reg.exec(url);
    return (temp)? temp[1] : null;
}

function getEmbedButton()
{
    var ret = '<button type="button" id="VideoPins_btn" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
                      <span class="yt-uix-button-content">\
                        <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
                    '</span>\
               </button>';
    return ret;
}

/*
function IncludeJQ()
{
    var jq = document.createElement('script');
    jq.setAttribute('type', 'text/javascript');
    jq.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
    document.body.appendChild(jq);
    alert(1);
}
*/