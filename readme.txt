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
	fontsize: 18
});

this.$.emergencyKill.call();

Note that font sizes are only available at 14, 18, 24 and 28.

License:	MIT 
Author:		Zachary Burke
Twitter: 	@error454
Website:	http://mobilecoder.wordpress.com