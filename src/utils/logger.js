import log from 'loglevel';
import config from '../conf/config.js';
import databaseService from '../services/database.services.js';

async function sendToServer(level, message) {
  if (level === 'warn' || level === 'error') {
    try {
      await databaseService.saveLogs({ level, message, timestamp: new Date().toISOString() });
    } catch (err) {
      log.warn('Failed to send log:', err);
    }
  }
}

// Custom method factory to intercept logs
log.methodFactory = function (methodName) {
  const originalMethod = log[methodName];
  return function (...args) {
    originalMethod(...args);
    sendToServer(methodName, args.join(' '));
  };
};

log.setLevel(config.nodeEnvironment === 'production' ? 'warn' : 'debug');

log.enableAll();

export default log;
