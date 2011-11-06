enyo.kind({
    name: "TouchPlayer.FileBrowser",
    kind: enyo.HFlexBox,    
    components: [
        {
          name: "listDirs",
          kind: "PalmService",
          service: "palm://ca.canucksoftware.filemgr",
          method: "listDirs",
          onSuccess: "gotDirs",
          onFailure: "genericFailure"
        },
        {
          name: "listFiles",
          kind: "PalmService",
          service: "palm://ca.canucksoftware.filemgr",
          method: "listFiles",
          onSuccess: "gotFiles",
          onFailure: "genericFailure"
        },
        {
          name: "getParent",
          kind: "PalmService",
          service: "palm://ca.canucksoftware.filemgr",
          method: "getParent",
          onSuccess: "gotParent",
          onFailure: "genericFailure"
        },
        {
          name: "deleteFile",
          kind: "PalmService",
          service: "palm://ca.canucksoftware.filemgr",
          method: "delete",
          onSuccess: "deleteSuccess"
        },
        {
          name: "playFile",
          kind: "PalmService",
          service: "palm://com.wordpress.mobilecoder.touchplayer.service",
          method: "play",
          onSuccess: "fileStarted"
        },
        {
          name: "emergencyKill",
          kind: "PalmService",
          service: "palm://com.wordpress.mobilecoder.touchplayer.service",
          method: "killall"
        },
		{
			name: "getFontList",
			kind: enyo.PalmService,
			service: "palm://com.wordpress.mobilecoder.touchplayer.service",
			method: "getfonts",
			onSuccess: "gotFonts"
        },
        {kind: "VFlexBox", 
        components: [
            {
                kind: "PageHeader", 
                layoutKind: "VFlexLayout",
                align: "left",
                className: "enyo-header-dark",
                components: [
                    {content: "TouchPlayer"},
                    {content: "ffplay Settings ", className: "enyo-item-secondary"}
                ]
            },
            {
                kind: "HFlexBox", align: "center",
                components: 
                [
                    { content: "Audio Enabled", flex: 1 },
                    {
                        kind: "ToggleButton",
                        name: "audioToggle",
                        state: true,
                        onLabel: "Yes",
                        offLabel: "No"
                    }
                ]
            },
            {
                kind: "HFlexBox", align: "center",
                    components: 
                    [
                        { content: "Font Scale", flex: 1  },
                        {
                            kind: "ListSelector",
                            name: "fontList",
                            items: [
                                { caption: "1x", value: "1" },
                                { caption: "2x", value: "2" },
                                { caption: "3x", value: "3" },
                                { caption: "4x", value: "4" },
                                { caption: "5x", value: "5" },
                                { caption: "6x", value: "6" },
                                { caption: "7x", value: "7" },
                                { caption: "8x", value: "8" },
                                { caption: "9x", value: "9" }
                            ]
                        }
                    ]
            },
            {
                kind: "HFlexBox", align: "center",
                    components: 
                    [
                        { content: "Font", flex: 1  },
                        {
                            kind: "ListSelector",
                            name: "fontName",
                        }
                    ]
            },
			{
                kind: "HFlexBox", align: "center",
                components: 
                [
                    { content: "Move subs to black", flex: 1 },
                    {
                        kind: "ToggleButton",
                        name: "moveSubsToggle",
                        state: false,
                        onLabel: "Yes",
                        offLabel: "No"
                    }
                ]
            },
            {
                kind: "Button",
                caption: "Emergency Kill",
                onclick: "killAll"
            }
            /*
            {
                kind: "HFlexBox", align: "center",
                components: 
                [
                    { content: "Visualization", flex: 1  },
                    {
                        kind: "ListSelector",
                        name: "visualizationList",
                        items: [
                            { caption: "Video", value: "video" },
                            { caption: "Waves", value: "waves" },
                            { caption: "RDFT", value: "rdft" }
                        ]
                    }
                ]
            },
            */
            /*
            {
                kind: "IntegerPicker",
                name: "threadPicker",
                className: "picker-hbox",
                label: "Threads",
                min: "1",
                max: "10",
                value: "1"
            },
            */
            /*
            {
                kind: "IntegerPicker",
                name: "subsPicker",
                className: "picker-hbox",
                label: "Subtitle Index",
                min: "0",
                max: "4",
                value: "0"
            },*/
            /*
            {
                kind: "HFlexBox", align: "center",
                components: 
                [
                    { content: "Flip vertical", flex: 1 },
                    {
                        kind: "ToggleButton",
                        name: "verticalToggle",
                        state: false,
                        onLabel: "Yes",
                        offLabel: "No"
                    }
                ]
            },
            */
        ]},
        {kind: "VFlexBox", flex: 5,
        components: [
            {
                kind: "PageHeader", 
                layoutKind: "VFlexLayout",
                align: "left",
                className: "enyo-header-dark",
                components: [
                    {content: "Current Path"},
                    {name: "pathText", content: "", className: "enyo-item-secondary"}
                ]
            },
            {
                kind: "VirtualList", name: "list", onSetupRow: "getSearchListItem", flex: 1,
                components: [
                    {kind: "SwipeableItem", flex: 1, onConfirm: "deleteItem", onclick: "selectItem",
                    components: [
                        {name: "entry"}
                    ]}
            ]}
        ]
        }
    ],
    create: function() {
        this.inherited(arguments);
        
		this.$.getFontList.call();
		
        currentDirectory = "/media/internal/";
        array = [];
        
        this.navigate(currentDirectory, true);        
    },
    gotFiles: function(inSender, payload){
        //populate list        
        for(var i = 0; i < payload.items.length; i++){
        array.push( {item: array.length,
            label: payload.items[i].name,
            value: payload.items[i].path,
            type: "file"});
        }
        this.$.list.refresh();
    },
    gotDirs: function(inSender, payload){
        //populate list
        for(var i = 0; i < payload.items.length; i++){
            array.push( {item: array.length,
                label: payload.items[i].name,
                value: payload.items[i].path,
                type: "dir"});
        }
        this.$.list.refresh();
        this.$.listFiles.call({path: currentDirectory});
    },
    navigate: function(path, refresh){
        currentDirectory = path;
        this.$.pathText.setContent(currentDirectory);
        
        array = [];
        
        if(refresh){
            this.$.list.punt();
        }
        
        array.push({item:array.length, label: "..", value: "parent", type: "parent"});
        this.$.listDirs.call({path: currentDirectory});
    },
    getSearchListItem: function(inSender, inIndex){
        if(array[inIndex]){
            this.$.entry.setContent(array[inIndex].label);            
            return true;
        }
    },
    selectItem: function(inSender, inEvent){
        if(array[inEvent.rowIndex]){
            inSender.setStyle("background-color:#A9F5A9");
            var item = array[inEvent.rowIndex];
            if(item.type == "file"){
                enyo.scrim.show();
                this.$.playFile.call(
                {
                    source: item.value, 
                    audio: this.$.audioToggle.getState(),
                    fontscale: this.$.fontList.getValue(),
                    font: this.$.fontName.getValue(),
					movesubs: this.$.moveSubsToggle.getState()
                });
            }
            else if(item.type == "dir"){
                this.navigate(item.value, true);
            }
            else if(item.type == "parent"){
                this.$.getParent.call({file: currentDirectory});
            }
        }
    },
    gotParent: function(inSender, payload){
        this.navigate(payload.parent, true);
    },
    genericFailure: function(inSender){
        enyo.error("We have failed");
    },
    deleteItem: function(inSender, inIndex){
        this.$.deleteFile.call({file: array[inIndex].value});
    },
    deleteSuccess: function(inSender, inIndex){
        this.navigate(currentDirectory, true);
    },
    killAll: function(inSender){
        this.$.emergencyKill.call();
    },
    fileStarted: function(inSender){
        enyo.scrim.hide();
    },
	gotFonts: function(inSender, inResponse, inRequest){
		//Populate the font dialog
        this.$.fontName.setItems(inResponse.reply);		
	}
});