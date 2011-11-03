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
* 		fontsize: integer
*       charset: en|cy
*		movesubs: boolean

        User contributes fonts are here:
        http://www.mplayerhq.hu/MPlayer/contrib/fonts/
        
        For cryllic fonts: -subcp cp1251

		-autosync 0 -mc 0 
		-cache-min 5 
		-cache 8192 
		-lavdopts fast:skiploopfilter=all:threads=4 
		-quiet 
		-font font-arial-cp1250/font-arial-18-cp1250/font.desc 
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
	
    if(inArgs.charset != null){
        if(inArgs.charset == "cy"){
            args += "-subcp cp1251 -font fonts/mpfont_cyr/font.desc ";
        }
    }
    
    if(inArgs.charset == null || inArgs.charset == "en"){
        if(inArgs.fontsize != null){
            switch(inArgs.fontsize){
            case 14:
                args += "-font fonts/font-arial-14-iso-8859-7/font.desc "
            break;
                
            case 18:
                args += "-font fonts/font-arial-18-iso-8859-7/font.desc "
            break;
            
            case 24:
                args += "-font fonts/font-arial-24-iso-8859-7/font.desc "
            break;
            
            case 28:
                args += "-font fonts/font-arial-28-iso-8859-7/font.desc "
            break;
            
            default:
                args += "-font fonts/font-arial-18-iso-8859-7/font.desc "
            }
        }
    }
	/*
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
	*/
	
	var cmd = new CommandLine("./mplayer " + args + " \"" + this.controller.args.source + "\"", null);
	cmd.run();
    future.result = true;
}