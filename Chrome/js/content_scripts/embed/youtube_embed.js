console.log(window.location.href);

if(window.location.href.indexOf("#")<0)
{
    $("body").append('<button type="button" id="videopins_pin" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
                          <span class="yt-uix-button-content">\
                              <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
                          '</span>\
                      </button>');

    $('#videopins_pin').css({
        top: '260px',
        right: '0px',
        position: "fixed",
        zIndex: '999'
    });

	$('#videopins_pin').click(function(){
	    /* do somtthing */    
        var obj = new Object();
            obj.title = document.title;
            obj.src = window.location.href;

        chrome.extension.sendRequest({request: "openWindow", value: obj});
	    return false;
	});

	$("body").hover(function(){
        $('#videopins_pin').animate({
            right: '0px'
          }, 300 );
	}, function(){
        var width = $('#videopins_pin')[0].offsetWidth;
        $('#videopins_pin').animate({
            right: -width + 'px'
          }, 300 );
    });
}

