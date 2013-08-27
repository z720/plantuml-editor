(function($){
    var encode64 = function(data) {
    	r = "";
		for (i=0; i<data.length; i+=3) {
			if (i+2==data.length) {
				r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
			} else if (i+1==data.length) {
				r += append3bytes(data.charCodeAt(i), 0, 0);
			} else {
				r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), data.charCodeAt(i+2));
			}
		}
		return r;
	};

	var append3bytes = function(b1, b2, b3) {
		c1 = b1 >> 2;
		c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
		c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
		c4 = b3 & 0x3F;
		r = "";
		r += encode6bit(c1 & 0x3F);
		r += encode6bit(c2 & 0x3F);
		r += encode6bit(c3 & 0x3F);
		r += encode6bit(c4 & 0x3F);
		return r;
	};

	var encode6bit = function(b) {
		if (b < 10) {
			return String.fromCharCode(48 + b);
		}
		b -= 10;
		if (b < 26) {
			return String.fromCharCode(65 + b);
		}
		b -= 26;
		if (b < 26) {
			return String.fromCharCode(97 + b);
		}
		b -= 26;
		if (b == 0) {
			return '-';
		}
		if (b == 1) {
			return '_';
		}
		return '?';
	};

	var getURL = function(s) {
	  //UTF8
	  s = unescape(encodeURIComponent(s));
	  return "http://www.plantuml.com/plantuml/img/"+encode64(deflate(s, 9));
	};
    
    $('#source').on('change blur keypress', function() {
        $('#update').trigger('source-changed');
        console.log('source-change triggered');
        $(this).prop('data-encoded',encode64(deflate(unescape(encodeURIComponent($(this).val())), 9)));
        // function() {
            console.log('source-encoded triggered');
            $('#target').trigger('source-encoded');
        //});
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
        $(this)
            .one('load', function() {
                $('#update').trigger('image-loaded');
                console.log('Image loaded');
            })
            .prop('src',  
                "http://www.plantuml.com/plantuml/img/"+$('#source').prop('data-encoded')
            );
            $('#targetlink').val("http://www.plantuml.com/plantuml/img/"+$('#source').prop('data-encoded'));
    }));
    
    $(document).on('ready', function() {
        var encoded = window.location.search;
        if(encoded) {
            console.log('Load content');
        } else {
            console.log('Default value');
        }
    })
    
})(jQuery);