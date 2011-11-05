var fontAssistant = function(){}
/*
*	service call: 	checkperms
*	function: 		Makes sure that we are running as root
*   argument list:
*		A callback function that takes 1 parameter, the parameter passed in
*       will be an object with the fields:
*       {
*           "root": boolean,
*           "mplayer": boolean,
*           "homebrew": boolean
*       }
*/
    
fontAssistant.prototype.run = function(future){
	this.future = future;
	
    //Get the list of fonts in /usr/share/fonts
    var fontCmd = new CommandLine("ls /usr/share/fonts", function(results) {
        var finalList = [];
		var fonts = results.stdout.split(".ttf");
		
		for(var i = 0; i < fonts.length; i++){
			if(fonts[i] != ""){
				finalList.push(fonts[i].trim());
			}
		}
        console.log("returning fonts: " + finalList);
        future.result = {reply: finalList};
    });
    
    //Start the first command which will chain the remaining
	fontCmd.run();
}