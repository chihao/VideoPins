
var bg_page = chrome.extension.getBackgroundPage();
var container = $('ul#option-items');
var items = bg_page.Options.get();

for(var i in items)
{
    var key  = i;
    var item = items[key];

    switch(item.type)
    {
// CheckBox.
    case 'checkbox':
        container.append($(document.createElement("li"))
            .append(
                $(document.createElement("input")).attr({
                    id      : 'option-' + key,
                    name    : key,
                    value   : item.value,
                    type    : 'checkbox',
                    checked : item.value
                })
                .click(function(event)
                {
                    var cbox = $(this)[0];
                    bg_page.Options.set(cbox.name, cbox.checked);
                })
            )
            .append(
                $(document.createElement('label')).attr({
                    'for':  'option-' + key
                })
                .text(chrome.i18n.getMessage('opt_'+key))
            )
        );
        break;
// Slider.
    case 'slider':
        $(function(){
            var value = bg_page.Options.get("scale");
            
            /* Set labels */
            $("#option-width").text( chrome.i18n.getMessage('opt_width')+':' );
            $("#option-height").text( chrome.i18n.getMessage('opt_height')+':' );
            $("#option-width-value").text(  bg_page.Options.Scale.Width() +'px' );
            $("#option-height-value").text( bg_page.Options.Scale.Height()+'px' );
            
            /* Set slider */                            
            $("#slider-value").text((value*100).toFixed(0)+'%');
            $("#slider").slider({
                value : value,
                min   : 0,
                max   : 2,
                step  : 0.05,
                range : "min",
                slide: function(event, ui) {
                    value = parseFloat(ui.value);
                    bg_page.Options.set("scale", value);
                    $("#slider-value").text((value*100).toFixed(0)+'%');
                    $("#option-width-value").text(  bg_page.Options.Scale.Width() +'px' );
                    $("#option-height-value").text( bg_page.Options.Scale.Height()+'px' );
                    
                    if(parseFloat(value)<0.5) $("#slider-warning").show(); else $("#slider-warning").hide();
                }
            });
            
            /* Warning message */
            if(parseFloat(value)<0.5) $("#slider-warning").show(); else $("#slider-warning").hide();                            
            $("#slider-warning").text(chrome.i18n.getMessage('opt_scale_warning'));
            // $("#slider").slider("value")
        });
        break;
// Position.    
    case 'position':
        $(function(){
            /* Set label */
            $("#option-pos-label").text(chrome.i18n.getMessage('opt_'+key));
            $("#option-pos-label-value").text(chrome.i18n.getMessage('opt_pos'+item.value));
            
            /* Set default checked */
            var $radios = $('input:radio[name=pos]');
            if($radios.is(':checked') === false) {
                $radios.filter('[value='+item.value+']').attr('checked', true);
            }

            /* Set radios */
            $("#option-pos").buttonset();
            $("#option-pos label").addClass('ui-corner-all');
            $("#option-pos .pos").button({
                icons: {
                    primary: "ui-icon-block"
                },
                text: false})
                .click(function(event)
                {
                    var value = $(this)[0].value;
                    bg_page.Options.set("position", value);
                    $("#option-pos-label-value").text(chrome.i18n.getMessage('opt_pos'+value));
                });
        });
        break;
    }
}

// Version.
$("#version").text(chrome.i18n.getMessage("version")+":"+chrome.app.getDetails().version);
