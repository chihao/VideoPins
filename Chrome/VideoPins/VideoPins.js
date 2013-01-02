var bg_page = chrome.extension.getBackgroundPage();
var obj = JSON.parse(localStorage['video']);
var m_Pin = null;
var ytplayer = null;

// Blocking advertising.
chrome.windows.getCurrent({populate:true},
    function(window)
    {
        chrome.webRequest.onBeforeRequest.addListener
        (
            function(details)
            {
                return {cancel: details.url.indexOf("/googleads.") != -1};
            },
            {urls: ["<all_urls>"], tabId: window.tabs[0].id},
            ["blocking"]
        );
    });


window.onload = function()
{   // after page onloaded.
    document.title = obj.title;
    document.getElementById('VideoPins_Player').innerHTML = obj.html;

    m_Pin = new VideoPins(document.getElementById("embedVideoPins"));
    setTimeout(function() { Init(); }, 300);
};

function Init()
{
    console.log(document.title===obj.title);
    if(m_Pin.FindWindow(obj.title))
    {        
        // windows XP offset: width=10, height=27. correct=650,418.
        m_Pin.Hook(obj.x, obj.y, obj.width, obj.height);

        chrome.windows.getCurrent(
            function(window)
            {
                var newPin = new Object();
                newPin.hWnd = m_Pin.getHWND();
                newPin.title = obj.title;
                //alert(window.width +'\n' + window.height);

                bg_page.Pins.add(window.id, newPin);
            });

        // Include youtube player api.
        var ytapi = document.createElement('script');
        ytapi.setAttribute('type', 'text/javascript');
        ytapi.setAttribute('src', './YouTube/player_api.js');
        document.body.appendChild(ytapi);
    }
    else
        setTimeout(function() { Init(); }, 300);
}

// document.onclick = getMousePosition;
function getMousePosition(e) 
{
    posX = e.pageX;
    posY = e.pageY;
    alert(posX + '\n' + posY);
    return true;
}

function onYouTubePlayerAPIReady()
{
    ytplayer = new YT.Player('ytplayer', {
        events  : {
            'onReady': onPlayerReady,
            'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event)
{
    var autoplay = bg_page.Options.get("autoplay");
    if(autoplay) ytplayer.playVideo();
}

function onPlayerPlaybackQualityChange(event)
{
}

function onPlayerStateChange(event)
{
    switch(event.data)
    { //unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). 
    case YT.PlayerState.UNSTARTED:
        console.log("UNSTARTED");
        break;

    case YT.PlayerState.ENDED:
        console.log("ENDED");
        m_Pin.ReHook();
        break;

    case YT.PlayerState.PLAYING:
        console.log("PLAYING");
        m_Pin.ReHook();
        break;

    case YT.PlayerState.PAUSED:
        console.log("PAUSED");
        m_Pin.UnHook();
        break;

    case YT.PlayerState.BUFFERING:
        console.log("BUFFERING");
        break;

    case YT.PlayerState.CUED:
        console.log("CUED");
        break;
    }
}

function onPlayerError(event)
{
}

function VideoPins(obj)
{
    this.pluginObj = obj;
    this.hWnd = null;
}

VideoPins.prototype = 
{    
    echo : function(str) { alert(this.pluginObj.echo(str)); },

    getHWND :
    function()
    {
        return this.hWnd;
    },

    FindWindow : 
    function(title)
    {
        this.hWnd = this.pluginObj.vFindWindow(this.getClassName(), title);
        console.log("hWnd:"  + this.hWnd + '\n' +
                    "Class:" + this.getClassName() + '\n' +
                    "Title:" + title);
        return this.hWnd;
    },

    Hook :
    function(x, y, width, height)
    {
        this.pluginObj.HookWindow(this.hWnd, x, y, width, height);
    },

    ReHook :
    function()
    {
        return this.pluginObj.ReHookWindow(this.hWnd);
    },

    UnHook :
    function()
    {
        return this.pluginObj.UnHookWindow(this.hWnd);
    },

    getClassName :
    function()
    {
        var OS_Flag = navigator.appVersion;

        if(OS_Flag.indexOf("Linux")>=0)
        {
            if(OS_Flag.indexOf("Chromium")>=0)
                return "crx_" + chrome.i18n.getMessage("@@extension_id") + ".Chromium-browser";
            else
                return "crx_" + chrome.i18n.getMessage("@@extension_id") + ".Google-chrome";
        }
        else
            return "Chrome_WidgetWin_1";
    },
    
    test :
    function(title)
    {
        alert(this.pluginObj.Xtest(title));
    }
};
