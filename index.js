const { Plugin } = require("powercord/entities");

const pingTimeouts = [];

module.exports = class MessageLogger extends Plugin {
	startPlugin() {
		this.runNextTimeout();
	}

	pluginWillUnload() {
		for (let timeout of pingTimeouts) {
			clearTimeout(timeout);
		}
	}

	runNextTimeout() {
		let thisTimeout;
		pingTimeouts.push(
			(thisTimeout = setTimeout(() => {
				pingTimeouts.splice(pingTimeouts.indexOf(thisTimeout), 1);
				// If the current date is April 1st...
				if (new Date().getMonth() == 3 && new Date().getDate() == 1) {
					new Audio(
						"https://discord.com/assets/dd920c06a01e5bb8b09678581e29d56f.mp3"
					).play();
					if (pingTimeouts.length < 1024) {
						this.runNextTimeout();
					}
				}
				this.runNextTimeout();
			}, this.rand(1e2, 60e3 * 5)))
		);
	}

	rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};
