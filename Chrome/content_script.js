
$('#eow-title').click
(
    function()
    {
        var obj = new Object();
        obj.title = $('#eow-title').text().replace(/^\s+/,"").replace(/\n/,"");
        obj.x = 100;
        obj.y = 100;
        obj.width = $('#watch-player').width();
        obj.height = $('#watch-player').height();
        obj.html = $('#watch-player').html();
    
        chrome.extension.sendRequest({request: "openWindow", value: obj});
    }
)