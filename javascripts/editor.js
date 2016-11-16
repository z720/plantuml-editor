(function(window){
    var $= window.jQuery,
    Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
    encode64 = function(data) {
        var r = "";
        for (var i=0; i<data.length; i+=3) {
        	if (i+2==data.length) {
        		r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
        	} else if (i+1==data.length) {
        		r += append3bytes(data.charCodeAt(i), 0, 0);
        	} else {
                r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), data.charCodeAt(i+2));
        	}
        }
        return r;
	},
    append3bytes = function(b1, b2, b3) {
		var c1 = b1 >> 2,
		c2 = ((b1 & 0x3) << 4) | (b2 >> 4),
		c3 = ((b2 & 0xF) << 2) | (b3 >> 6),
		c4 = b3 & 0x3F,
		r = "";
		r += encode6bit(c1 & 0x3F);
		r += encode6bit(c2 & 0x3F);
		r += encode6bit(c3 & 0x3F);
		r += encode6bit(c4 & 0x3F);
		return r;
	}
	encode6bit = function(b) {
		if (b < 10) { return String.fromCharCode(48 + b); }
		b -= 10;
		if (b < 26) { return String.fromCharCode(65 + b); }
		b -= 26; 
		if (b < 26) { return String.fromCharCode(97 + b); }
		b -= 26;
		if (b == 0) { return '-'; }
		if (b == 1) { return '_'; }
		return '?';
	};

    $('#source').on('change focusout keyup paste cut', function() {
        $('#update').trigger('source-changed');
        console.log('source-change triggered');
        $(this).prop('data-encoded',encode64(deflate(unescape(encodeURIComponent($(this).val())), 9)));
        $('#target').trigger('source-encoded');
        console.log('source-encoded triggered');
    });
    $('#update').on('click', function(e) {
        try {
            $('#target').trigger('uml-update');
        } catch(e) {
            console.log(e);
        }
        return false;
    }).on('source-changed', function() {
        $(this).prop('disabled',false);
    }).on('image-loaded ready', function() {
        $(this).prop('disabled',true);
    });
    $('#target').on('source-encoded', $.debounce(250,function()  {
        var imgurl = "//www.plantuml.com/plantuml/img/"+$('#source').prop('data-encoded');
        $(this)
            .one('load', function() {
                $('#update').trigger('image-loaded');
                console.log('Image loaded');
            }).prop('src', imgurl);
            
            $('#dl_src').prop("href", function() {
                return "data:text/plain;base64,"+Base64.encode($('#source').val());
            }).prop("download", function() {
                return $("#diagram_name").val() + ".uml"
            });
            
            $('#dl_img').prop("href", function() {
                return imgurl;
            }).prop("download", function() {
                return $("#diagram_name").val() + ".png"
            });
    }));
    $('#diagram_name').on('change', function() {
        $('#dl_src').prop("download", function() {
            return $("#diagram_name").val() + ".uml"
        });
            
        $('#dl_img').prop("download", function() {
            return $("#diagram_name").val() + ".png"
        });
    });
    $(document).on('ready', function() {
        var encoded = window.location.search;
        if(encoded) {
            console.log('Load content');
        } else {
            console.log('Default value');
        }
    })
    
})(window);