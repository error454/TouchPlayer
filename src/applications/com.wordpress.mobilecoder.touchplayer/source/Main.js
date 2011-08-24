enyo.kind({
	name: "TouchPlayer.Main",
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
		  method: "play"
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
					{ content: "Non-spec optimize", flex: 1  },
					{
						kind: "ToggleButton",
						name: "optimizeToggle",
						state: false,
						onLabel: "Yes",
						offLabel: "No"
					}
				]
			},
			{
				kind: "IntegerPicker",
				name: "threadPicker",
				className: "picker-hbox",
				label: "Threads",
				min: "1",
				max: "10",
				value: "1"
			}
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
		},
		/*
		{kind: "AppMenu", components: [
			{caption: "Preferences", onclick: "viewSettingsClick"},
			{caption: "About", onclick: "aboutClick"},
		]}
		*/
	],
	create: function() {
		this.inherited(arguments);
		that = this;
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
				//Build up arguments
				var args = "";
				if(this.$.audioToggle.getState() == false){
					args += "-an ";
				}
				if(this.$.optimizeToggle.getState() == true){
					args += "-fast ";
				}
				if(this.$.threadPicker.getValue() > 1){
					args += "-threads " + this.$.threadPicker.getValue();
				}
				this.$.playFile.call({source: item.value, switches: args});
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
	}
});