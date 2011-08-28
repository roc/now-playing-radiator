/*
 * Super quick text maximiser pluigin
 * Made by roc aka http://gl-ob.com
 * Hat doffed to:
	http://vidasp.net/tinydemos/adjust-font-size.html
*/

(function( $ ){

	$.fn.sizeUp = function( options ) {  

		var settings = {
			'byHeight' : false //TODO - pass to width then do ++/-- calculations for height
		};

		return this.each(function() {        
		
		//er, for padding...
		if ( options ) { 
			$.extend( settings, options );
		}

		var $this = $(this),
			boxDimensions = {
				"width" : $(this).css("width"),
				"height" : $(this).css("height")
			},
			fontSize = parseInt($(this).css("fontSize"), 10), // Assuming 10 as minimum, TODO: add as setting?
			$line, dimensions;
		
		
		$this.html(function(i,v) {
			return $("<span class='resized'>").text(v).css({
				//"whiteSpace" : "nowrap",
				"padding" : settings.padding + "px"
			});
		});
		
		$line = $this.children("span").first();
		
		lineDimensions = {
			"height" : $line.css("height"),
			"width" : $line.css("width")
		}
		
		// TODO: make this less stupid
		if(settings.byHeight)
		{
			while (parseFloat(lineDimensions.height) < parseFloat(boxDimensions.height) ) {
				fontSize += 1;
				$line.css("fontSize", fontSize + "px");
				lineDimensions.height = $line.css("height");
			};

		} else {
				
			while ( parseFloat(lineDimensions.width) < parseFloat(boxDimensions.width) ) {
				fontSize += 1;
				$line.css("fontSize", fontSize + "px");
				lineDimensions.width = $line.css("width");
			}

		}	

		
		
		/* 
			TODO, make this work with SCIENCE, not trial & error...
																	*/
		fontSize -= 15; //Adjust down as a failsafe
		$line.css("fontSize", fontSize + "px");
		//if(settings.byHeight) $this.css({"height": $line.css("height")});


    });

  };
})( jQuery );
