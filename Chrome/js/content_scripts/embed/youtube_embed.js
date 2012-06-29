console.log(window.location.href);

if(window.location.href.indexOf("#")<0)
{
	/* open button */
	var a = document.createElement('a');
	a.id   = 'videopins_pin';
	a.href = '#';
	a.title = chrome.i18n.getMessage('tooltip');
	// a.style.display  = 'block';
	a.style.display  = 'hidden';
	a.style.width    = '32px';
	a.style.height   = '32px';
	a.style.overflow = 'hidden';
	a.style.zIndex   = '999';
	a.style.position = 'fixed';
	a.style.top      = '260px';
	a.style.right    = '0';
	a.style.background = 'url('+chrome.extension.getURL('/images/icon32.png')+') no-repeat';
	document.body.appendChild(a);

	$('#videopins_pin').click(function(){
	    /* do somtthing */    
        // var title = document.title;
        // var html = comm.getYoutubeEmbedLink(window.location.href);
        var obj = new Object();
            obj.title = document.title;
            obj.src = window.location.href;

        chrome.extension.sendRequest({request: "openWindow", value: obj});
        //comm.popup(title, html);
	    return false;
	});

	$("body").hover(function(){
		$('#videopins_pin').show();
	}, function(){
		$('#videopins_pin').hide();	
	});
}

