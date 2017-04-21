import path from 'path';
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
		const configGlob = `${options.path}/{default,local,env-${options.env}}/*${options.ext}`;
		const configFiles = glob.sync(configGlob);

		//console.log('Config glob is %s', configGlob);
		//console.log('Configfiles found: ', configFiles);

		let configurations = [];

		// Merge all files into an config object
		configFiles.forEach(function(configFile) {

			var match = /\/([a-zA-ZåäöÅÄÖ\s\-]+)\/Config\.?([a-zA-ZåäöÅÄÖ\s\-]*)\.?js/gi.exec(configFile);

			if(!match) {
				console.error(configFile + ' is not a valid name');
			}

			//console.log('rqp', path.relative(__dirname, configFile));
			const configuration = require(path.relative(__dirname, configFile));

			const config = {
				env: match[1],
				scope: match[2],
				config: configuration
			}

			//console.log('configFiles', configFile, config);

			configurations.push(config);
			//configArrys.push(require(configFile));
		});

		//console.log('Configurations: ', configurations);

		let finalConfig = {
			scopes: {}
		};

		configurations.forEach((config) => {
			//console.log(config.config);

			if(config.scope !== '' && config.scope) {
				//console.log(config.scope, finalConfig.scopes, finalConfig.scopes[config.scope]);

				if (!finalConfig.scopes[config.scope]) {
					finalConfig.scopes[config.scope] = {};
				}

				finalConfig.scopes[config.scope] = Object.assign(finalConfig.scopes[config.scope], config.config);
			} else {
				finalConfig = Object.assign(finalConfig, config.config);
			}
		});

		//console.log('FINAL CONFIG IS:', JSON.stringify(finalConfig, null, 4));

		return finalConfig;
	}
}

module.exports = ConfigurationReader;