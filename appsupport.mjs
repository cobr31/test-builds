import { default as DBG } from 'debug';
const debug = DBG('exprap266:debug');
const dbgerror = DBG('notes:error');
import { port } from './app.mjs';

// Handles conversion of port number string into number, 
// where isNaN is checked in case a named pipe is in use.
export function normalizePort (val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0)  {
    return port;
  }
  return false;
}
// Handling errors from the HTTP server object. Check either port or the pipe.
export function onError(error)  {
  dbgerror(error);                        // Change for debug enablement.
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

  switch (error.code)   {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1); 
      break;
    case `EADDRINUSE`:
        console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
    }
}
// Message saying where server listens to HTTP connection.
// Imported server as function references server object.
import { server } from './app.mjs';
export function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
  debug(`Listening on ${bind}`);    // change to enable debug -  console.log(`Listening on ${bind}`);      // change for debug enablement.
}

export function handle404(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next (err);
}

export function basicErrorHandler(err, req, res, next)  {
  // Defer to built-in error handler if headersSent
  // See: http:expressjs.com/en/guide/error-handling.html
  if (res.headersSent)  {
    return next(err)
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'  
                  ? err 
                  : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

process.on('uncaughtException', function(err) {
  console.error(`I've crashed!! - ${(err.stack || err)}`);
});

import * as util from 'util';
process.on('unhandeledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at : ${util.inspect(p)} reason: ${reason}`);
});


