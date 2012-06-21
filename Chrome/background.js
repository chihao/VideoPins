var OS_Flag = navigator.appVersion;

var OS_windowOffsetW = 0;
var OS_windowOffsetH = 0;

if(OS_Flag.indexOf("NT 5.1") > 0){
    OS_windowOffsetW = 10; OS_windowOffsetH = 27;
}
/*
if(OS_Flag.indexOf("NT 6.1") > 0 ){
    document.getElementById("OS").innerHTML="Microsoft Windows 7";  //6
  }
  else if(OS_Flag.indexOf("NT 6.0") > 0 ){
    document.getElementById("OS").innerHTML="Microsoft Windows Vista";  //6
  }
  else if(OS_Flag.indexOf("NT 5.0") > 0 ){
    document.getElementById("OS").innerHTML="Microsoft Windows 2000";  //4
  }
  else if(OS_Flag.indexOf("NT 5.1") > 0){
    document.getElementById("OS").innerHTML="Microsoft Windows XP"; //5
  }
  else if (OS_Flag.indexOf("Win 9x 4") > 0){
    document.getElementById("OS").innerHTML="Microsoft Windows ME";  //3
  }
  else if (OS_Flag.indexOf("98") > 0){
    document.getElementById("OS").innerHTML="Microsoft Windows 98";  //2
  }
  else if (OS_Flag.indexOf("95") > 0){
    document.getElementById("OS").innerHTML="Microsoft Windows 95";  //1
  }
  else if (OS_Flag.indexOf("NT 5.2") > 0){
    document.getElementById("OS").innerHTML="Microsoft Windows 2003";  //6
  }
  else {
    document.getElementById("OS").innerHTML="非微軟作業系統"; //0
  }
*/


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
    var wid = Pins.get(obj.title);
    
    if(wid == -1)
    {
        localStorage['video'] = JSON.stringify(obj);
        window.open('VideoPins.html', obj.title, 'width='+obj.width+', height='+obj.height+', toolbar=no, menubar=no, location=no, status=no');
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
            if(this._list[i].title == title) return parseInt(i);
        }
        return parseInt(-1);
    },
    
    clear : function() { this._list = new Array(); },
    toString : function() { return "[Object Pins]"; }
};
