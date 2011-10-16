enyo.kind({
	name: "TouchPlayer.Main",
	kind: enyo.VFlexBox,
	components: 
	[
        {name: "launchURL", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open"},
		{name: "pane1", kind: "Pane", flex: 1, onSelectView: "viewSelected",
			  components: [
				{name: "fileBrowser", className: "enyo-bg", kind: "TouchPlayer.FileBrowser"},	
				{name: "about", className: "enyo-bg", kind: "TouchPlayer.About", onOkAboutScreenFinished: "hideAbout"},
			  ]
		},
		{kind: "AppMenu", components: [
			{caption: "About", onclick: "aboutClick"},
            {caption: "Help", onclick: "helpClick"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.$.pane1.selectViewByName("fileBrowser");
	},
	aboutClick: function(){
		this.$.pane1.selectViewByName("about");
	},
    helpClick: function(){
		this.$.launchURL.call({target: "http://mobilecoder.wordpress.com/2011/10/16/touchplayer-documentation/"});
	},
	hideAbout: function(){
		this.$.pane1.selectViewByName("fileBrowser");
	}
});