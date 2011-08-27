enyo.kind({
	name: "TouchPlayer.Main",
	kind: enyo.VFlexBox,
	components: 
	[
		{name: "pane1", kind: "Pane", flex: 1, onSelectView: "viewSelected",
			  components: [
				{name: "fileBrowser", className: "enyo-bg", kind: "TouchPlayer.FileBrowser"},	
				{name: "about", className: "enyo-bg", kind: "TouchPlayer.About", onOkAboutScreenFinished: "hideAbout"}
			  ]
		},
		{kind: "AppMenu", components: [
			{caption: "About", onclick: "aboutClick"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.$.pane1.selectViewByName("fileBrowser");
	},
	aboutClick: function(){
		this.$.pane1.selectViewByName("about");
	},
	hideAbout: function(){
		this.$.pane1.selectViewByName("fileBrowser");
	}
});