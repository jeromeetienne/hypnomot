var Hypnomot	= Hypnomot	|| {};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


Hypnomot.Beat	= function(opts){
	opts		= opts		|| {};
	this._bpm	= opts.bpm	|| 60;

	this._context	= new webkitAudioContext();
	var context	= this._context;


	function loadSound(url, onSuccess, onError){
		onError		= onError	|| function(){
			console.log("loadSound error", url, arguments)
		}
		
		var request	= new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		
		// Decode asynchronously
		request.onload	= function() {
			context.decodeAudioData(request.response, onSuccess, onError);
		}
		request.send();
	}

	loadSound('/sounds/kick.wav', function(buffer){
		this._buffer	= buffer;
		this._timeoutCtor();
	}.bind(this))
	
}

Hypnomot.Beat.prototype.destroy	= function()
{
	this._timeoutDtor();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

Hypnomot.Beat.prototype.isReady	= function()
{
	return this._buffer ? true : false;
}

Hypnomot.Beat.prototype.bpm	= function(newValue)
{
	if( newValue !== undefined )	this._bpm	= newValue;;
	return this._bpm;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

Hypnomot.Beat.prototype._timeoutCtor	= function()
{
	this._timeout	= setTimeout(this._timeoutCb.bind(this), 0);
}

Hypnomot.Beat.prototype._timeoutDtor	= function(){
	this._timeout	&& clearTimeout(this._timeout);
	this._timeout	= null;
}

Hypnomot.Beat.prototype._timeoutCb	= function()
{
	var context	= this._context;
	var source	= context.createBufferSource();
	source.buffer	= this._buffer;
	source.connect(context.destination);
	source.noteOn(0);

	this._timeout	= setTimeout(this._timeoutCb.bind(this), (60 / this._bpm) * 1000);
}

