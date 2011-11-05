A Video Player for the HP Touchpad

This project combines a file browser activity and video service for the HP Touchpad.  

Activity:
The file browser is nothing special, just a file browser with a couple parameter switches for mplayer.  

Service:
The service provides an interface to the mplayer binary and also allows parameter passing.  

*NOTE* The service requires that the mplayer binary is present in its path.  To build mplayer you can use the forked version of mplayer for the Touchpad here:
https://github.com/error454/mplayer-webos

Service Calls:
There are 2 service calls available, examples of how to call them:
{
  name: "playFile",
  kind: "PalmService",
  service: "palm://com.wordpress.mobilecoder.touchplayer.service",
  method: "play"
}

this.$.playFile.call(
{
	source: "/media/internal/some/folder/video.mpg", 
	audio: boolean,
	font: string,		//since v1.0.5a see getFontList below (case insensitive)
	fontsize: integer,
    charset: "en",	 	//since v1.0.5 --deprecated v1.0.5a
	movesubs: boolean,	//since v1.0.5a
	onSuccess: callback //since v1.0.5a
});

{
  name: "emergencyKill",
  kind: "PalmService",
  service: "palm://com.wordpress.mobilecoder.touchplayer.service",
  method: "killall"
}
this.$.emergencyKill.call();

{
	name: "getFontList",
	kind: enyo.PalmService,
	service: "palm://com.wordpress.mobilecoder.touchplayer.service",
	method: "getfonts",
	onSuccess: "gotFonts"
}

this.$.getFontList.call();

gotFonts: function(inSender, inResponse, inRequest){
	var fonts = inResponse.reply;
	for(var i = 0; i < fonts.length; i++){
		console.log(fonts[i]);
	}
}

License:	MIT 
Author:		Zachary Burke
Twitter: 	@error454
Website:	http://mobilecoder.wordpress.com