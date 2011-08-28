/*
*	ffplay service
	author: Zachary Burke
	website: http://mobilecoder.wordpress.com
	twitter: @error454
*/

var ffplayAssistant = function(){}

/*
*	service call: 	play
*	function: 		plays a video using ffplay with the specified options
*   argument list:
*		source: the absolute path of the file to play
* 		visualization: waves, video(default) or rdft
*		audio: boolean
*		flipVertical: boolean
*		threads: integer
*		subIndex: integer
* 		
*/
ffplayAssistant.prototype.run = function(future){

	//Build up ffplay command
	var inArgs = this.controller.args;
	var args = "";
	
	if(inArgs.audio == false){
		args += "-an ";
	}
	
	if(inArgs.threads > 0){
		args += "-threads " + inArgs.threads + " ";
	}
	
	if(inArgs.visualization == "waves"){
		args += "-showmode 1 ";
	}
	else if(inArgs.visualization == "rdft"){
		args += "-showmode 2 ";
	}
	
	if(inArgs.flipVertical == true){
		args += "-vf \"vflip\" ";
	}
	
	if(inArgs.subIndex > 0){
		args += "-sst " + inArgs.subIndex + " ";
	}
				
	var cmd = new CommandLine("./ffplay " + args + " \"" + this.controller.args.source + "\"", future);
	cmd.run();
}
