var options_ver = 1;
var options = option_get();

chrome.extension.onRequest.addListener
(
    function(request, sender, callback)
    {
        console.log(request.request);
        switch(request.request)
        {
        case 'openWindow':
            openWindow(request.value);
            break;
        }
    }
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
    var newObj    = new Object();
    newObj.id     = obj.id;
    newObj.title  = obj.title;
    newObj.type   = obj.type;
    newObj.x      = 100;
    newObj.y      = 100;
    newObj.width  = 640;
    newObj.height = 390;
    newObj.html   = getYoutubeEmbedLink(obj.id);

    var wid = Pins.get(newObj.title);
    
    if(wid == -1)
    {
        localStorage['video'] = JSON.stringify(newObj);
        window.open('VideoPins.html', newObj.title, 'width='+newObj.width+', height='+newObj.height+', toolbar=no, menubar=no, location=no, status=no');
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

function option_save()
{
    localStorage['options'] = JSON.stringify(options);
}

function option_init()
{
    var ret = {
                "autoplay" : { key : "autoplay", value : true  }
              };

    return ret;
}

function option_checkVer()
{
    var oldVer = parseInt(localStorage['options_ver']);
    var isNew = (oldVer != options_ver);
    if(isNew) localStorage['options_ver'] = options_ver;

    return isNew;
}

function option_getList()
{
    var ls_option = localStorage['options'];
    var ret;

    if(typeof ls_option == "undefined" || option_checkVer())
    {
        ret = option_init();
        localStorage['options'] = JSON.stringify(ret);
    }
    else
    {
        ret = JSON.parse(ls_option);
    }
    return ret;
}

function option_set(key, value)
{
    options[key].value = value;
}

function option_get(key)
{
    var list = option_getList();
    return (typeof key == "undefined")? list : list[key].value;
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

    // gethWnd :
    // function(title)
    // {
    //     var i = this.get(title); 
    //     return (i===-1)? null : this._list[i].hWnd;
    // },
    
    clear : function() { this._list = new Array(); },
    toString : function() { return "[Object Pins]"; }
};
