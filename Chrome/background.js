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
    newObj.title  = obj.title;
    newObj.x      = 100;
    newObj.y      = 100;
    newObj.width  = 640;
    newObj.height = 390;
    newObj.html   = getYoutubeEmbedLink(obj.src);


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


function getYoutubeEmbedLink(url)
{    
    //"<iframe width='420' height='315' src=\"http://www.youtube.com/embed/k0BWlvnBmIE\" frameborder='0' allowfullscreen></iframe>"
    var id = getYoutubeId(url);
    if(id==null)
      var src = url;
    else
      var src = "http://www.youtube.com/embed/"+id;

    var ret = '<iframe src="'+src+'#" frameborder allowfullscreen></iframe>';
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
            if(this._list[i].title == title) return parseInt(i);
        }
        return parseInt(-1);
    },
    
    clear : function() { this._list = new Array(); },
    toString : function() { return "[Object Pins]"; }
};
