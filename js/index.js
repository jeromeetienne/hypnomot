jQuery(function(){
	var player	= new Player({
		slides		: slides
	})
	jQuery("#slideContainer").empty().append( player.domElement() );

	player.renderSlide(0);
	
	//var beat	= new Hypnomot.Beat();
	//
	//setInterval(function(){
	//	console.log("beat", beat.bpm())
	//}, 500)
	//setTimeout(function(){
	//	beat.bpm(120);
	//}, 2500)
})