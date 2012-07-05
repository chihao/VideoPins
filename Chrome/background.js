
chrome.extension.onRequest.addListener
(
    function(request, sender, callback)
    {
        console.log(request.request);
        switch(request.request)
        {
        case 'openWindow':
            if(request.value.id)
                openWindow(request.value);
            else
                alert("Fetch video id error.");
            break;
        }
    }
);

chrome.webRequest.onBeforeRequest.addListener
(
    function(details) {
       return {cancel: details.url.indexOf("/googleads.") != -1};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

chrome.windows.onRemoved.addListener
(
    function(wid)
    {
        console.log("remove wid:"+wid);
        Pins.remove(wid);
    }
);

function openWindow(obj)
{      
    var pos       = Options.Position.evl(Options.Scale.Width(), Options.Scale.Height());
    var newObj    = new Object();
    newObj.id     = obj.id;
    newObj.title  = obj.title;
    newObj.type   = obj.type;
    newObj.x      = pos.x;
    newObj.y      = pos.y;
    newObj.width  = Options.Scale.Width();
    newObj.height = Options.Scale.Height();
    newObj.html   = getYoutubeEmbedLink(obj.id);

    var wid = Pins.get(newObj.title);
    
    if(wid == -1)
    {
        localStorage['video'] = JSON.stringify(newObj);
        window.open('VideoPins.html', newObj.title, 'left='+newObj.x+', top='+newObj.y+', width='+newObj.width+', height='+newObj.height+', toolbar=no, menubar=no, location=no, status=no');
    }
    else
    {
        var updateinfo = new Object();
        updateinfo.focused = true;
        //updateinfo.drawAttention  = true;
        
        chrome.windows.update(wid, updateinfo);
    }

/*
    var newWindow = new Object();
    newWindow.url = "VideoPins.html";
    newWindow.type = "popup";
    chrome.windows.create(newWindow,
        function(window)
        {
            console.log(window.id);
        });
*/
}

var Pins =
{
    _list : new Array(),
    add : function(wid, obj) { this._list[wid] = obj; console.log(wid+'\n'+JSON.stringify(this._list[wid])); },
    remove : function(wid) { if(typeof this._list[wid] != "undefined") delete this._list[wid]; },
    
    get : 
    function(title)
    {
        for(var i in this._list)
        {
            if(this._list[i].title === title) return parseInt(i);
        }
        return parseInt(-1);
    },

    clear : function() { this._list = new Array(); },
    toString : function() { return "[Object Pins]"; }
};
