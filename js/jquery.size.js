/*
 * Super quick text maximiser pluigin
 * Made by roc aka http://gl-ob.com
 * Hat doffed to:
	http://vidasp.net/tinydemos/adjust-font-size.html
*/

(function( $ ){

	$.fn.sizeUp = function( options ) {  

		var settings = {
			'padding' : 10
		};

		return this.each(function() {        
		
		//er, for padding...
		if ( options ) { 
			$.extend( settings, options );
		}

		var $this = $(this),
			boxWidth = $(this).css("width"),
			fontSize = parseInt($(this).css("fontSize"), 10), // Assuming 10 as minimum, TODO: add as setting?
			$line, lineWidth;
		
		
		$this.html(function(i,v) {
			return $("<span class='resized'>").text(v).css({
				"whiteSpace" : "nowrap",
				"padding" : settings.padding + "px"
			});
		});
		
		$line = $this.children("span").first();
		lineWidth = $line.css("width");
				

		while ( parseFloat(lineWidth) < parseFloat(boxWidth) ) {
			fontSize += 1;
			$line.css("fontSize", fontSize + "px");
			lineWidth = $line.css("width");
		}
		
		/* 
			TODO, make this work with SCIENCE, not trial & error...
																	*/
		fontSize -= (0.4 * (settings.padding));
		$line.css("fontSize", fontSize + "px");


    });

  };
})( jQuery );
