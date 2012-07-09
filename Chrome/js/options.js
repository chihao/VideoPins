
var Options = 
{
    Width   : 640,
    Height  : 360,
    default : {
                "autoplay" : { type : "checkbox", value : true  },
                "scale"    : { type : "slider"  , value : 1.0   },
                "position" : { type : "position", value : 0     }
              },

    _list : null,
    
    init : 
    function()
    {
        // Is new install.
        var newInstall = (typeof localStorage['options']==="undefined");

        // Options has been updated.
        var optUpdated = false;
        
        // Copy from default list.
        var list = new Object(this.default);

        // Initial
        if(newInstall)
            this._list = new Object(list);
        else
        {
            this._list = JSON.parse(localStorage['options']);

            // Add new property.
            for(var i in list)
            {
                if(typeof this._list[i]==="undefined")
                {
                    optUpdated = true;
                    this._list[i] = list[i];
                }
            }

            // Remove excess property.
            for(var i in this._list)
            {
                if(typeof list[i]==="undefined")
                {
                    optUpdated = true;
                    delete this._list[i];
                }
            }
        }

        // Store
        localStorage['options'] = JSON.stringify(this._list);

        // If options has been updated then show options page.
        if(newInstall || optUpdated)
            chrome.tabs.create({ 'url' : chrome.extension.getURL("options/index.html") });
    },

    set :
    function(key, value)
    {
        this._list[key].value = value;
        localStorage['options'] = JSON.stringify(this._list);
    },

    get : function(key)
    {
        this._list = JSON.parse(localStorage['options']);
        return (typeof key == "undefined")? this._list : this._list[key].value;
    },

    /* Options.Scale*/
    Scale :
    {
        Width  : function() { return parseInt(Options.Width  * parseFloat(Options.get("scale"))); },
        Height : function() { return parseInt(Options.Height * parseFloat(Options.get("scale"))); }        
    },
    
    /* Options.Position */
    Position :
    {
        TL : '0',
        TR : '1',
        CT : '2',
        BL : '3',
        BR : '4',
        evl : 
        function(window_W, window_H)
        {
            var pos = new Object();
            switch(Options.get("position"))
            {
            case Options.Position.TL:
                pos = { x: 0, y: 0 };
                break;

            case Options.Position.TR:
                pos = { x: window.screen.availWidth-window_W, y: 0 };
                break;

            case Options.Position.CT:
                pos = { x: (window.screen.availWidth-window_W)/2, 
                        y: (window.screen.availHeight-window_H)/2 };
                break;

            case Options.Position.BL:
                pos = { x: 0, y: window.screen.availHeight-window_H };
                break;

            case Options.Position.BR:
                pos = { x: window.screen.availWidth-window_W, 
                        y: window.screen.availHeight-window_H };
                break;

            default:
                pos = { x: 0, y: 0 };
                break;
            }
            return pos;
        }
    },

    toString : function() { return "[Object Options]"; }
};
Options.init();
