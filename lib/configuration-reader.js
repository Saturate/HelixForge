import fs from 'fs';

class ConfigurationReader {
	constructor(options) {
		const defaultOptions = {
			path: './BuildConfiguration',
			prefix: 'config.'
			ext: '.js'

		}
		
		this.options = options;
	}
	
	getConfigurationfiles() {
		// Load all files in config
	}
}