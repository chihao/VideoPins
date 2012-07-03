 
var Options = 
{
    version : 1,
    default : {
                "autoplay" : { key : "autoplay", type : "checkbox", value : true  },
                "position" : { key : "position", type : "position", value : 0     }
              },

    _list : new Object(this.default),

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

    /* Options.Position */
    Position :
    {
        TL : 0,
        TR : 1,
        CT : 2,
        BL : 3,
        BR : 4,
        evl : 
        function()
        {
            // window.screen.height = 768
            // window.screen.width = 1366
            var pos = new Object();
            switch(Options.get("position"))
            {
            case Options.Position.TL:
                pos = {x: 0, y: 0};
                break;

            case Options.Position.TR:
                pos = {x: 0, y: 0};
                break;

            case Options.Position.CT:
                pos = {x: 0, y: 0};
                break;

            case Options.Position.BL:
                pos = {x: 0, y: 0};
                break;

            case Options.Position.BR:
                pos = {x: 0, y: 0};
                break;

            default:
                pos = {x: 0, y: 0};
                break;
            }
            return pos;
        }
    },

    toString : function() { return "[Object Options]"; }
};
