/**
 * This is a helper to intercept console.log messages
 * and restore them after the test has run.
 */
const consoleHelper = function(fn) {
  let originalConsoleLog = console.log;

  function restore() {
    console.log = originalConsoleLog;
  }

  if (fn.length) {
    fn(restore);
  } else {
    fn();
    restore();
  }
};

module.exports = {
  consoleHelper
};
