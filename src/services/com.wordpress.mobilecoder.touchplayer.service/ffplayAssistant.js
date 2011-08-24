/*
*	ffplay service
	author: Zachary Burke
	website: http://mobilecoder.wordpress.com
	twitter: @error454
*/

var ffplayAssistant = function(){}

/*
*	service call: 	play
*	function: 		plays a video using ffplay with the specified arguments
*/
ffplayAssistant.prototype.run = function(future){

	var cmd = new CommandLine("./ffplay " + this.controller.args.switches + " \"" + this.controller.args.source + "\"", future);
	cmd.run();
}
