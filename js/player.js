//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var Player	= function(opts)
{
	this._slides	= opts.slides	|| console.assert(false);
	this._domElement= jQuery("<div>");	
}

Player.prototype.destroy	= function()
{	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

Player.prototype.domElement	= function(){
	return this._domElement;
}

Player.prototype.renderSlide	= function(slideIdx)
{
	console.log("this._slides", this._slides, slideIdx)

	var slide	= this._slides.items[slideIdx];

	var output	= jQuery( "#slideTemplate" ).render(slide.templateData);

	jQuery(this._domElement).empty().append( output );
}