enyo.kind({
	name: "TouchPlayer.Main",
	kind: enyo.VFlexBox,
	components: 
	[
        {
			name: "installCheck",
			kind: enyo.PalmService,
			service: "palm://com.wordpress.mobilecoder.touchplayer.service",
			method: "checkperms",
			onSuccess: "showFolders",
			subscribe: false
        },
        {name: "launchURL", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open"},
		{name: "pane1", kind: "Pane", flex: 1, onSelectView: "viewSelected",
			  components: [
                {name: "install", kind: "VFlexBox", align: "center", pack: "center",
                components: [
                    {kind: "SpinnerLarge", name: "spinner"},
                    {name: "info", content: "Validating Install"}
                ]},
				{name: "fileBrowser", className: "enyo-bg", kind: "TouchPlayer.FileBrowser"},	
				{name: "about", className: "enyo-bg", kind: "TouchPlayer.About", onOkAboutScreenFinished: "hideAbout"},
                {name: "badInstall", kind: "VFlexBox", align: "center", pack: "center",
                components: [
                    {kind: "HtmlContent", content: "<h2>Something is wrong with your installation of TouchPlayer.  The following tests failed:</h2>"},
                    {kind: "HtmlContent", name: "failReasons"}
                ]}
			  ]
		},
		{kind: "AppMenu", components: [
			{caption: "About", onclick: "aboutClick"},
            {caption: "Help", onclick: "helpClick"}
		]}
	],
	create: function() {
		this.inherited(arguments);		
		var ready = false;
        this.$.spinner.show();
		this.$.installCheck.call();
	},
	aboutClick: function(){
		this.$.pane1.selectViewByName("about");
	},
    helpClick: function(){
		this.$.launchURL.call({target: "http://mobilecoder.wordpress.com/2011/10/16/touchplayer-documentation/"});
	},
	hideAbout: function(){
        if(this.ready){
            this.$.pane1.selectViewByName("fileBrowser");
        }
        else{
            this.$.pane1.selectViewByName("install");
        }
	},
	showFolders: function(inSender, inResponse, inRequest){
		this.$.info.setContent("Install check completed: "); 
        var status = inResponse.reply;
		if(status.root && status.mplayer && status.homebrew){
			this.ready = true;
			this.$.pane1.selectViewByName("fileBrowser");
		}
		else{
			this.$.pane1.selectViewByName("badInstall");
            
            var reasons = "";
            if(!status.root){
                reasons = "<b><font color=red>(FAILED)</font> Service not running as root</b><br>The most likely reasons are:<ul><li>The homebrew-js-service is not installed</li><li>TouchPlayer was not installed using Preware or WOSI and therefore the post-install scripts did not run</li><li>The device was not rebooted after install</li></ul></li>";
            }
            if(!status.mplayer){
                reasons += "<b><font color=red>(FAILED) </font>The mplayer binary CRC check failed</b><br>This means that the binary is damaged, this is most likely the result of a failed install.<br><br>"
            }
            if(!status.homebrew){
                reasons += "<b><font color=red>(FAILED) </font>The homebrew-js-framework could not be found</b><br>This is a dependency of TouchPlayer that should have been installed automatically if you installed with Preware or WOSI.";
            }
            
            this.$.failReasons.setContent(reasons);
		}
	}	
});