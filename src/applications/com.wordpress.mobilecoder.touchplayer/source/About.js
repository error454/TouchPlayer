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
			{kind: "HtmlContent", content: '<b>Version 1.0.5</b> <ul> <li>Improvements to back-end mplayer launching</li> <li>Preliminary Cyrillic character support</li> <li>Move subtitles into empty black area if possible</li> </ul><b>Version 1.0.4</b> <ul> <li>NEON accelerated YUV to RGB conversion for YV12 image format</li> <li>Now using GLES2 for video rendering</li> <li>Now using mplayer instead of ffplay</li> <li>Subtitle support (bitmap fonts only for now)</li> <li>On screen display</li> <li>New controls for Play/Pause, Fast forward/Rewind, Toggle Subtitles</li> <ul> <li>1 finger swipe left/right for a short jump</li> <li>2 finger swipe left/right for a long jump</li> <li>Single finger tap to play/pause (automatically pauses in card view)</li> <li>Triple finger slide up to toggle subtitles</li> <li>Triple finger slide down to choose subtitle track</li> </ul> <li>New standardized service calls for anyone that wants to use Touchplayer to launch videos</li> </ul><b>Version 1.0.3</b> <ul> <li>Audio visualization options</li> <li>Flip video vertically</li> <li>New Service Calls</li> <ul> <li>Vertical Screen flip</li> <li>Visualization Options</li> <li>Subtitle streams</li> </ul> <li>Added About screen</li> <li>Changed SDL initialization method to specify full-screen, this eliminates the sliver of screen that was visible.</li> </ul>  <b>Version 1.0.2</b> <ul> <li>Updated package dependencies to specify file manager service.</li> </ul>  <b>Version 1.0.1</b> <ul> <li>Initial Release</li> </ul>'},
			{kind: "Button", name: "okButton", caption: "Ok", onclick: "doOkAboutScreenFinished"},
		]}
	],
	create: function() {
		this.inherited(arguments);
	}
});