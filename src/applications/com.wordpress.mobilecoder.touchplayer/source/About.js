enyo.kind({
	name: "TouchPlayer.About",
	kind: enyo.VFlexBox,
	events: { onOkAboutScreenFinished: ""},
	components: [
		{kind: "PageHeader", className: "enyo-header-dark",
		components: [
			{layoutKind: "VFlexLayout", 
			components: [
				{content: "About"}
			]}
		]},
		{kind: "Scroller", flex: 1,
		components: [
			{kind: "HtmlContent", content: '<b>Version 1.0.7</b><br> <ul> <li>Added UI field to paste rtsp streams</li> <li>Added scale parameter to the play service call which basically does: args += "-vf scale=:" + inArgs.scale + " ";)</li> <li>Playing a file now automatically kills existing mplayer instances</li> </ul><b>Version 1.0.6a</b><br><ul><li> Modified post-install script to attempt to fix install issues.  I was able to reproduce the issue on my device.  I verified that after fixing the files, a simple Luna restart did not resolve the issue but a reboot did.  Therefore, a reboot is now required after install</li></ul><b>Version 1.0.6</b><br> One cold night in November, I decided to update TouchPlayer to 1.0.6.  Of the many improvements, the install process should be much smoother.  For those that haven\'t a clue how to install things, at least you will now get verbose output as to what is wrong with your install.<br>  MKV support hasn\'t really changed, with audio enabled the CPU is still pegged.  I probably won\'t be researching enhancements to this for awhile.  <ul> <li>Added install check</li> <li>Modified back-end launching, hopefully making emergency kill unecessary</li> <li>Now uses TTF fonts, user can choose from fonts installed in /usr/share/fonts/.  This makes old font.desc junk obsolete and should also immediately support all locals</li> <li>Font scaling now works (sizes in the GUI are multipliers not points)</li> <li>New API call for getting list of fonts</li> <li>New API call for validating installation</li> <li>New API parameters for playing videos</li> <li>Updated to latest FFmpeg and mplayer as of 11/5/2011</li> </ul><b>Version 1.0.5</b> <ul> <li>Improvements to back-end mplayer launching</li> <li>Preliminary Cyrillic character support</li> <li>Move subtitles into empty black area if possible</li> </ul><b>Version 1.0.4</b> <ul> <li>NEON accelerated YUV to RGB conversion for YV12 image format</li> <li>Now using GLES2 for video rendering</li> <li>Now using mplayer instead of ffplay</li> <li>Subtitle support (bitmap fonts only for now)</li> <li>On screen display</li> <li>New controls for Play/Pause, Fast forward/Rewind, Toggle Subtitles</li> <ul> <li>1 finger swipe left/right for a short jump</li> <li>2 finger swipe left/right for a long jump</li> <li>Single finger tap to play/pause (automatically pauses in card view)</li> <li>Triple finger slide up to toggle subtitles</li> <li>Triple finger slide down to choose subtitle track</li> </ul> <li>New standardized service calls for anyone that wants to use Touchplayer to launch videos</li> </ul><b>Version 1.0.3</b> <ul> <li>Audio visualization options</li> <li>Flip video vertically</li> <li>New Service Calls</li> <ul> <li>Vertical Screen flip</li> <li>Visualization Options</li> <li>Subtitle streams</li> </ul> <li>Added About screen</li> <li>Changed SDL initialization method to specify full-screen, this eliminates the sliver of screen that was visible.</li> </ul>  <b>Version 1.0.2</b> <ul> <li>Updated package dependencies to specify file manager service.</li> </ul>  <b>Version 1.0.1</b> <ul> <li>Initial Release</li> </ul>'},
			{kind: "Button", name: "okButton", caption: "Ok", onclick: "doOkAboutScreenFinished"},
		]}
	],
	create: function() {
		this.inherited(arguments);
	}
});