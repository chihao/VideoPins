function VideoPins(obj)
{
    this.pluginObj = obj;
    this.hWnd = null;
}

VideoPins.prototype = 
{    
    echo : function(str) { alert(this.pluginObj.echo(str)); },

    HookWindow :
    function(title, x, y, width, height)
    {
        console.log("Class:" + this.getClassName() + '\n' +
                    "Title:" + title + '\n' + 
                    "x:" + x + '\n' + 
                    "y:" + y + '\n' + 
                    "width:" + width + '\n' + 
                    "height:" + height);

        this.hWnd = this.pluginObj.HookWindow(this.getClassName(), title, x, y, width, height);
        return this.hWnd;
    },

    ReHookWindow :
    function(hWnd)
    {
        hWnd = (typeof hWnd === "undefined")? this.hWnd : hWnd;
        return this.pluginObj.ReHookWindow(hWnd);
    },

    UnHookWindow :
    function(hWnd)
    {
        hWnd = (typeof hWnd === "undefined")? this.hWnd : hWnd;
        return this.pluginObj.UnHookWindow(hWnd);
    },

    getClassName :
    function()
    {
        var OS_Flag = navigator.appVersion;

        if(OS_Flag.indexOf("Chromium") > 0)
            return "crx_" + chrome.i18n.getMessage("@@extension_id") + ".Chromium-browser";
        else
            return "Chrome_WidgetWin_1";
    },
    
    test :
    function(title)
    {
        alert(this.pluginObj.Xtest(title));
    }
};