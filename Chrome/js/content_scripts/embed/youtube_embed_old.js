
$("object").each(function(index) {
    var src = $(this).find("embed").attr("src");
    var YoutubeId = getYoutubeId(src);

    if(YoutubeId)
    {
        // var position = $(this).position();
        // var offset  = $(this).find("embed")[0];

        $(this).append(getEmbedButton());

        var button = $(this).find("#VideoPins_btn");
        
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
            $.get("https://gdata.youtube.com/feeds/api/videos/"+YoutubeId,
                function(xml){
                    var obj = new Object();
                    obj.title = $(xml).find('title').text();
                    obj.type  = getType(src);
                    obj.id    = getYoutubeId(src);

                    chrome.extension.sendRequest({request: "openWindow", value: obj});
                }, "xml");
            return false;
        });
    }
});

// <object type="application/x-shockwave-flash" id="myytplayer" name="myytplayer" data="http://www.youtube.com/v/EVDCzYeiqaI?enablejsapi=1&amp;playerapiid=ytplayer&amp;fs=1&amp;showinfo=0&amp;cc_load_policy=1&amp;iv_load_policy=3" width="640" height="510" title="Flash"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"></object>