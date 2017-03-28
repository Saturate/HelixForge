import chalk from 'chalk';

const levels = {
  off: {
    value: 0
  },
  fatal: {
    color: 'red',
    name: 'Fatal',
    value: 100
  },
  error: {
    color: 'red',
    name: 'Error',
    value: 200
  },
  warning: {
    color: 'yellow',
    name: 'Warning',
    value: 300
  },
  info: {
    color: 'blue',
    name: 'Info',
    value: 400
  },
  debug: {
    color: 'grey',
    name: 'Debug',
    value: 500
  },
  trace: {
    color: 'grey',
    name: 'Trace',
    value: 600,
  },
  all: {
    color: 'grey',
    name: 'All',
    value: 700,
  }
}

// TODO: Read log level from configuration reader
const log = function(severity, message, level) {
  let logLevel = level || 'warning';
  const severitySettings = levels[severity];
  const outputMessage = shouldBeOutputted(severity, message, logLevel);

  if (!outputMessage) return false;

  outputLogMessage(severitySettings, message);
};

const outputLogMessage = function(type, message) {
  console.log(chalk[type.color](type.name + ': ' + message));
};

const shouldBeOutputted = function(severity, message, logLevel) {
  if (message === undefined || !message.length) return false;
  if (!levels.hasOwnProperty(severity) || !levels.hasOwnProperty(logLevel)) return false;
  if (levels[severity].value > levels[logLevel].value) return false;

  return true;
};

module.exports = {
  log,
  outputLogMessage
};
