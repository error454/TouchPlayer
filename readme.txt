A Video Player for the HP Touchpad

This project combines a file browser activity and video service for the HP Touchpad.  

Activity:
The file browser is nothing special, just a file browser with a couple parameter switches for mplayer.  

Service:
The service provides an interface to the mplayer binary and also allows parameter passing.  

Hybrid Service (cexec):
A c-based service that allows executing files.  I am having issues with the NodeJS equivalent and decided
to go for the proven method.

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

{
  name: "emergencyKill",
  kind: "PalmService",
  service: "palm://com.wordpress.mobilecoder.touchplayer.service",
  method: "killall"
}

this.$.playFile.call(
{
	source: "/media/internal/some/folder/video.mpg", 
	audio: true,
	fontsize: 18,
    charset: "en",	 	//since v1.0.5
	movesubs: false		//since v1.0.5a
});

this.$.emergencyKill.call();

fontsize parameters:
14, 18, 24, 28

charset parameters:
en, cy

License:	MIT 
Author:		Zachary Burke
Twitter: 	@error454
Website:	http://mobilecoder.wordpress.com