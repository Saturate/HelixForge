/*global describe, it*/
'use strict';

import 'babel-polyfill';
const expect = require('chai').expect;
const sinon = require('sinon');
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
    helpers.consoleHelper(function() {
      let logs = [];
      console.log = function() { logs.push(arguments) };

      logger.log('warning', messages.warning, 'warning');

      expect(logs[0].length).to.equal(1);
    });
  });

  it('outputs an error message when log level is warning', () => {
    helpers.consoleHelper(function() {
      let logs = [];
      console.log = function() { logs.push(arguments) };

      logger.log('error', messages.error, 'warning');

      expect(logs[0].length).to.equal(1);
    });
  });

  it('outputs the correct severity message', () => {
    helpers.consoleHelper(function() {
      let logs = [];
      console.log = function() { logs.push(arguments) };

      logger.log('warning', messages.warning, 'warning');

      expect(logs[0][0]).to.contain(messages.warning);
    });
  });

  /*it('can log a warning message', () => {
    const type = {
      color: 'yellow',
      name: 'Warning'
    };
    const message = 'I am a warning message and I am yellow!';
    sinon.spy(console, 'log');
    logger.outputLogMessage(type, message);

    expect( console.log.calledWith(type.name + ': ' + message) ).to.be.true;
  });*/
});
