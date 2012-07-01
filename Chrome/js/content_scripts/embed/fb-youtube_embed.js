    $("body").append('<button type="button" id="videopins_pin" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
                          <span class="yt-uix-button-content">\
                              <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
                          '</span>\
                      </button>');

    $('#videopins_pin').css({
        top: '260px',
        right: '0px',
        position: "fixed",
        zIndex: '999'
    });

    $('#videopins_pin').click(function(){
        /* do somtthing */    
          var obj = new Object();
              obj.title = document.title;
              obj.src = window.location.href;

          chrome.extension.sendRequest({request: "openWindow", value: obj});
        return false;
    });

    $("body").hover(function(){
          $('#videopins_pin').animate({
              right: '0px'
            }, 300 );
    }, function(){
          var width = $('#videopins_pin')[0].offsetWidth;
          $('#videopins_pin').animate({
              right: -width + 'px'
            }, 300 );
    });
// alert(1);

// // $('embed').load(function() {
        
// window.onload = function()
// {   // after page onloaded.
//     // while (typeof $("embed").attr("src") == "undefined") {}
//     // alert($("embed").attr("src"));
//     $("body").append('<button type="button" id="videopins_pin" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
//                           <span class="yt-uix-button-content">\
//                               <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
//                           '</span>\
//                       </button>');
// /*
//     $('#videopins_pin').css({
//         top: '260px',
//         right: '0px',
//         position: "fixed",
//         zIndex: '999'
//     });

//     $('#videopins_pin').click(function(){
//         // do somtthing
//         var obj = new Object();
//             obj.title = document.title;
//             obj.src = window.location.href;

//         chrome.extension.sendRequest({request: "openWindow", value: obj});
//         return false;
//     });
//       */
// };
// // });

// // alert($("embed").first().attr("src"));
// // var YoutubeId = getYoutubeId($("embed").attr("src"));
// // alert(YoutubeId);

// function getYoutubeId(url)
// {
//     var reg = new RegExp('(?:https?://)?(?:www\\.)?(?:youtu\\.be/|youtube\\.com(?:/embed/|/v/|/watch\\?v=))([\\w-]{10,12})', 'g');
//     var temp = reg.exec(url);
//     return (temp)? temp[1] : null;
// }
// // console.log(window.location.href);

// // if(window.location.href.indexOf("#")<0)
// // {
// //     $("body").append('<button type="button" id="videopins_pin" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" title="'+chrome.i18n.getMessage('tooltip')+'" data-tooltip-text="'+chrome.i18n.getMessage('tooltip')+'">\
// //                           <span class="yt-uix-button-content">\
// //                               <img class="addto-label" src="'+chrome.extension.getURL('/images/icon.png')+'" alt="'+chrome.i18n.getMessage('tooltip')+'">' + 
// //                           '</span>\
// //                       </button>');

// //     $('#videopins_pin').css({
// //         top: '260px',
// //         right: '0px',
// //         position: "fixed",
// //         zIndex: '999'
// //     });

// // 	$('#videopins_pin').click(function(){
// // 	    /* do somtthing */    
// //         var obj = new Object();
// //             obj.title = document.title;
// //             obj.src = window.location.href;

// //         chrome.extension.sendRequest({request: "openWindow", value: obj});
// // 	    return false;
// // 	});

// // 	$("body").hover(function(){
// //         $('#videopins_pin').animate({
// //             right: '0px'
// //           }, 300 );
// // 	}, function(){
// //         var width = $('#videopins_pin')[0].offsetWidth;
// //         $('#videopins_pin').animate({
// //             right: -width + 'px'
// //           }, 300 );
// //     });
// // }


// /*
// <div class="-cx-PRIVATE-uiInlineBlock__root shareRedesignVideo shareRedesignMedia -cx-PRIVATE-uiImageBlock__image  lfloat swfObject" id="u5qzo9_155" data-swfid="swf_u5qzo9_155">
//     <iframe width="358" height="220" frameborder="0" src="https://s-static.ak.facebook.com/common/referer_frame.php"></iframe>
// </div>
// <embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/2ibDjtmeAbI?version=3&amp;autohide=1&amp;autoplay=1" width="398" height="224" style="display: block;" id="swf_ue10vs_14" name="swf_ue10vs_14" bgcolor="#f7f7f7" quality="high" scale="scale" allowfullscreen="true" allowscriptaccess="never" salign="tl" wmode="opaque" flashvars="width=398&amp;height=224" title="Flash">
// */
// ,
// {
//     "all_frames": true,
//     "include_globs": ["https://s-static.ak.facebook.com/common/referer_frame.php"],
//     "matches": ["http://*.facebook.com/*", "https://*.facebook.com/*"],
//     "css": ["/css/www-core-vflDwxflm.css"],
//     "js": ["/js/jquery-1.7.1.min.js", "/js/content_scripts/embed/fb-youtube_embed.js"],
//     "run_at": "document_end"
// }