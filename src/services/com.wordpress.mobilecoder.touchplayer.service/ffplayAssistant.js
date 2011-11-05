/*
*	ffplay service - Historically I used ffplay, now using mplayer but too lazy to
					 change the filename.
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
*		audio: boolean
*		font: string (case insensitive)
* 		fontsize: integer (this is a scale factor)
*		movesubs: boolean

	Possible experimental options
		-autosync 0 -mc 0 
		-cache-min 5 
		-cache 8192 
		-lavdopts fast:skiploopfilter=all:threads=4 
* 		
*/

ffplayAssistant.prototype.run = function(future){

	//Build up ffplay command
	var inArgs = this.controller.args;
	var args = "";
	
	if(inArgs.audio != null && inArgs.audio == false){
		args += "-ao null ";
	}
    
	//Add the standard set of arguments
	args += "-quiet -lavdopts fast:skiploopfilter=all:threads=2 -cache 8192 -cache-min 0 ";

	if(inArgs.movesubs != null && inArgs.movesubs == true){
		args += "-vf expand=:-100::2 ";
	}

	if(inArgs.font != null){
		if(inArgs.font.indexOf(".ttf") == -1){
			args += "-font \"/usr/share/fonts/" + inArgs.font + ".ttf\" ";
		}
	}
	else{
		args += "-font /usr/share/fonts/arial.ttf ";
	}
	    
	if(inArgs.fontsize != null && !isNaN(inArgs.fontsize)){
        args += "-subfont-text-scale " + inArgs.fontsize + " ";
	}
	
	var cmd = new CommandLine("./mplayer " + args + " \"" + this.controller.args.source + "\"", null);
	cmd.run();
    future.result = true;
}