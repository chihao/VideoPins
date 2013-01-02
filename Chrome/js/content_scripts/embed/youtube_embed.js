
var YoutubeId = getYoutubeId(window.location.href);
if(YoutubeId && window.location.href.indexOf("#")<0 && typeof $("body").find("#VideoPins_btn")[0] == "undefined")
{
    $("body").append(getEmbedButton());
 
    $('#VideoPins_btn').css({
        top: '75%',
        right: '0px',
        position: "fixed",
        zIndex: '999',
        borderStyle: 'none',
        backgroundColor: 'white'
    });

    $('#VideoPins_btn').click(function(){
        $.get("https://gdata.youtube.com/feeds/api/videos/"+YoutubeId,
            function(xml){
                var obj = new Object();
                obj.title = $(xml).find('title').text();
                obj.type  = getType(window.location.href);
                obj.id    = getYoutubeId(window.location.href);
                
                chrome.extension.sendRequest({request: "openWindow", value: obj});
            }, "xml");
        return false;
    });

    $("body").hover(function(){
          $('#VideoPins_btn').animate({
              right: '0px'
            }, 300 );
    }, function(){
          var width = $('#VideoPins_btn')[0].offsetWidth;
          $('#VideoPins_btn').animate({
              right: -width + 'px'
            }, 300 );
    });
}
