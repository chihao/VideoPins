
var Options = 
{
    Width   : 640,
    Height  : 390,
    default : {
                "autoplay" : { key : "autoplay", type : "checkbox", value : true  },
                "scale"    : { key : "scale"   , type : "slider"  , value : 1.0   },
                "position" : { key : "position", type : "position", value : 0     }
              },

    _list : null,
    
    init : 
    function()
    {
        // Copy from default list.
        var list = new Object(this.default);

        // Initial
        if((typeof localStorage['options']==="undefined"))
            this._list = new Object(list);
        else
        {
            this._list = JSON.parse(localStorage['options']);

            // Add new property.
            for(var i in list)
            {
                if(typeof this._list[i]==="undefined") this._list[i] = list[i];
            }

            // Remove excess property.
            for(var i in this._list)
            {
                if(typeof list[i]==="undefined") delete this._list[i];
            }
        }

        // Store
        localStorage['options'] = JSON.stringify(this._list);
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
