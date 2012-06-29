$("object").each(function(index) {
    $(this).append('<button type="button" id="videopins_pin" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
                        <span class="yt-uix-button-content">\
                            <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
                        '</span>\
                    </button>');
    var button = $(this).find("#videopins_pin");
    var src = $(this).find("embed").attr("src");
    // var position = $(this).position();
    // var offset  = $(this).find("embed")[0];

    // alert(offset.offsetTop);
    // alert($(this).find("embed")[0].offsetTop);
    // alert(position.right);
    // alert(button[0].offsetWidth);

    button.css({
        top: '0px',
        right: '0px',
        position: "relative",
        zIndex: '999'
    });

    button.click(function(){
        /* do somtthing */
        $.get("https://gdata.youtube.com/feeds/api/videos/"+getYoutubeId(src),
            function(xml){
                var obj = new Object();
                obj.title = $(xml).find('title').text();
                obj.src = src;

                chrome.extension.sendRequest({request: "openWindow", value: obj});
            }, "xml");

        return false;
    });
});

function getYoutubeId(url)
{
    var reg = new RegExp('(?:https?://)?(?:www\\.)?(?:youtu\\.be/|youtube\\.com(?:/embed/|/v/|/watch\\?v=))([\\w-]{10,12})', 'g');
    var temp = reg.exec(url);
    return (temp)? temp[1] : null;
}