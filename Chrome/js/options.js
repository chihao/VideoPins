
var Options = 
{
    version : 1,
    Width : 640,
    Height : 390,
    default : {
                "autoplay" : { key : "autoplay", type : "checkbox", value : true  },
                "scale"    : { key : "scale"   , type : "slider"  , value : 0.8   },
                "position" : { key : "position", type : "position", value : 0     }
              },

    _list : null,    
    init : function() { this._list = this.get(); },

    set :
    function(key, value)
    {
        this._list[key].value = value;
        localStorage['options'] = JSON.stringify(this._list);
    },

    get : function(key)
    {
        var ls_option = localStorage['options'];

        if(typeof ls_option == "undefined" || this.checkVer())
        {
            localStorage['options'] = JSON.stringify(this.default);
        }

        this._list = JSON.parse(localStorage['options']);
        return (typeof key == "undefined")? this._list : this._list[key].value;
    },

    checkVer :
    function()
    {
        var oldVer = parseInt(localStorage['options_ver']);
        var isNew = (oldVer != this.version);
        if(isNew) localStorage['options_ver'] = this.version;

        return isNew;
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
