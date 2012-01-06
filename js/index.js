jQuery(function(){
	var player	= new Player({
		slides		: slides
	})
	jQuery("#slideContainer").empty().append( player.domElement() );

	player.renderSlide(0);
})