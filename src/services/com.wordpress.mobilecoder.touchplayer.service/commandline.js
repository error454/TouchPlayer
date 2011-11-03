//A function that execs a given command
function CommandLine(cmd, callback) {
	if(cmd != null){
		this.command = cmd.trim();
	}
    this.callback = callback;
}

CommandLine.prototype.run = function() {
        var that = this;
		//This stuff is basically straight out of the NodeJS docs except for the callback stuff
		//http://nodejs.org/docs/v0.4.12/api/child_processes.html#child_process.spawn
		var exec = IMPORTS.require('child_process').exec;
		
		var options = 
		{ 
			encoding: 'utf8',
			timeout: 0,
			maxBuffer: 200*1024,
			killSignal: 'SIGKILL', //Need to monitor SIGTERM and make sure it cleans up extra threads
									//possibly use SIGKILL
			cwd: null,
			env: null 
		};

		var child = exec(this.command, options, 
			function (error, stdout, stderr) {
				if(that.callback != null){
					var out = {"error": error, "stdout": stdout, "stderr": stderr};
					that.callback(out);
				}
			});
}