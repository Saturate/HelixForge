/*global describe, it*/
'use strict';

import 'babel-polyfill';
const expect = require('chai').expect;
const helpers = require('./helpers');
const logger = require('../tasks/logger');

const messages = {
  warning: 'This is a warning message',
  error: 'This is an error message'
}

describe('Logger', () => {
  it('can be required without throwing error', () => {
    require('../tasks/logger');
  });

  it('skips logging if message is empty', () => {
    const logFunction = logger.log('warning', '', 'warning');

    expect(logFunction).to.be.false;
  });

  it('skips logging if message is undefined', () => {
    const logFunction = logger.log('warning', undefined, 'warning');

    expect(logFunction).to.be.false;
  });

  it('skips warning message when log level is error', () => {
    const logFunction = logger.log('warning', messages.warning, 'error');

    expect(logFunction).to.be.false;
  });

  it('outputs a warning message when log level is warning', () => {
    let logs = [];

    helpers.consoleHelper(function() {
      console.log = function() { logs.push(arguments) };

      logger.log('warning', messages.warning, 'warning');
    });

    expect(logs[0].length).to.equal(1);
  });

  it('outputs an error message when log level is warning', () => {
    let logs = [];

    helpers.consoleHelper(function() {
      console.log = function() { logs.push(arguments) };

      logger.log('error', messages.error, 'warning');
    });

    expect(logs.length).to.equal(1);
  });

  it('outputs the correct severity message', () => {
    let logs = [];

    helpers.consoleHelper(function() {
      console.log = function() { logs.push(arguments) };

      logger.log('warning', messages.warning, 'warning');
    });

    // Log message is an array of objects with 0,1,2,etc. as keys
    expect(logs[0][0]).to.contain(messages.warning);
  });
});
