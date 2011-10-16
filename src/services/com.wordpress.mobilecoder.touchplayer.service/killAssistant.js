/*
*	
	author: Zachary Burke
	website: http://mobilecoder.wordpress.com
	twitter: @error454
*/

var killAssistant = function(){}
/*
*	service call: 	killall
*	function: 		Kills any stray instances of mplayer that haven't been closed.
*                   I'm not sure why/how this occurs but it seems to do with using
*                   multi-threaded playback where a thread doesn't get shut down.
*   argument list:
*		no arguments
*/
killAssistant.prototype.run = function(future){	
	var cmd = new CommandLine("killall mplayer", future);
	cmd.run();
}