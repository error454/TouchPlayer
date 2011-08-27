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
		{kind: "VFlexBox", flex: 1,
		components: [
			{kind: "HtmlContent", content: 'Version 1.0.1 <ul> <li>Added helper text to settings page.</li> <li>Re-enable "Get" button in NZB Matrix Search after successful or failed download.</li> <li>Virtual keyboard "enter" now initiates search.</li> <li>Tapping the busy indicator in Queue and History modes now initiates a refresh.</li> <li>History View now only queries X items at a time where X is defined in settings.</li> <li>All NZBMatrix communications use SSL</li> <li>Added about page</li> <li>Added overview stub</li> </ul> Version 1.0.0 <ul> <li>Initial Release</li> </ul>'},
			{kind: "Button", name: "okButton", caption: "Ok", onclick: "doOkAboutScreenFinished"},
		]}
	],
	create: function() {
		this.inherited(arguments);
	}
});