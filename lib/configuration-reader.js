import fs from 'fs';
import glob from 'glob';

class ConfigurationReader {
	constructor(options) {
		const defaultOptions = {
			path: './BuildConfiguration',
			prefix: 'config.',
			ext: '.js',
			env: null
		}

		this.options = Object.assign(defaultOptions, options);

		return this.getConfiguration();
	}

	getConfiguration() {
		const options = this.options;

		//const defaultConfigGlob = `${options.path}/default/*${options.ext}`;
		//const localConfigGlob = `${options.path}/local/*${options.ext}`;
		const configGlob = `${options.path}/**/*${options.ext}`;

		console.log('Config glob is %s', configGlob);

		const configFiles = glob.sync(configGlob);

		let configurations = [];

		// Merge all files into an config object
		configFiles.forEach(function(configFile) {

			var match = /\/([a-zA-ZåäöÅÄÖ\s\-]+)\/Config\.?([a-zA-ZåäöÅÄÖ\s\-]*)\.?js/gi.exec(configFile);

			if(!match) {
				console.error(configFile + ' is not a valid name');
			}

			const config = {
				env: match[1],
				scope: match[2],
				config: {
					test: 'test' + match[1] + match[2]
				}
			}

			console.log(configFile, config);

			configurations.push(config);
			//configArrys.push(require(configFile));
		});


		// TODO: Sort configs to ensure correct merge order.

		console.log(configurations);

		let finalConfig = {
			scopes: {}
		};

		configurations.forEach((config) => {
			console.log(config.config);

			if(config.scope !== '' && config.scope) {
				console.log(config.scope, finalConfig.scopes, finalConfig.scopes[config.scope]);
				if (!finalConfig.scopes[config.scope]) { finalConfig.scopes[config.scope] = {} }
				finalConfig.scopes[config.scope] = Object.assign(finalConfig.scopes[config.scope], config.config);
			} else {
				finalConfig = Object.assign(finalConfig, config.config);
			}
		});


		console.log('FINAL CONFIG IS:', JSON.stringify(finalConfig, null, 4));
		// Load all files in config

		return finalConfig;
	}
}

module.exports = ConfigurationReader;