
Implementing data resources - Storage and retrieval.

Reference material: Node.js Web Development - page 266.

**Logging and capturing errors**

  <ul>
    <li>How much traffic is the app getting?</li>
    <li>Which pages are people hitting most?</li>
    <li>How many errors occur?</li>
    <li>What kind of errors occur?</li>
    <li>Are malformed requests being sent?</li>
  </ul>   


Logging and capturing errors such as _uncaughtException_ and _unhandledRejection errors_.    
Consideration should include a process of log rotation to manage resources efficiently.    

The initial Express-generator set up used morgan to create an activity logging system.
By declaring it this way:

```js
import { default as  logger } from 'morgan';
...
app.use(logger('dev'));
```


Morgan package will generate log files in these areas :    
  <ul>
    <li> Log format
    <li> Log location
  </ul>

To change the logging format, make this change to _app.mjs_:    

```js
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev'));
```

Follow this by running the app as follows:
```bash
REQUEST_LOG_FORMAT=common npm start
```

Using morgan to write logs to a file.      
**Implementing it with the rotating-file-stream package to enable log rotation.**

```bash
npm install rotating-file-system-stream --save
```
Add the following to app.mjs :

```js
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
  stream: process.env.REQUEST_LOG_FILE ?
  rfs.createStream(process.env.REQUEST_LOG_FILE, {
    size: '10M',     // To rotate every 10 megabytes written.
    interval: '1d',  // To rotate daily.
    compress: 'gzip' // To compress rotated files.
  })
  : process.stdout
}));
```
<br></br>

**Log to console and file, using logger declaration.**


```js
if (process.env.REQUEST_LOG_FILE) {
  app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev');)
}

```

Possible to run a detailed trace of Express using this command:

```shell
DEBUG=express: * npm start

```
    
    
Debug messages using the following declaration to the preferred module top.

```js
import { default as DBG } from 'debug';
const debug = DBG('exprap266: debug');
const dbgerror = DBG('exprap266: error);

```

Command to perform logging direct to file.

```shell
REQUEST_LOG_FILE=log.text REQUEST_LOG_FORMAT=common DEBUG=exprap266:* node ./app.mjs
```

**Debug messages.**

Express uses DEBUG internally.Example of debug command call for Express:

```shell
DEBUG=express:* npm start

```

To use with the code created so far, declare the following at the top of the required module.

```js
import { default as DBG } from 'debug';
const debug = DBG('exprap266');
const dbgerror = DBG('exprap266:error');

```

To add debugging, update the file app.mjs.    
    
```js
server.on('request', (req, res) => {
  debug(`${new Date().toISOString() } request ${req.method} ${req.url}`);
});

```

To output an error trace captured by express, change the appsupport.mjs  _onError_ function.


```js
export function onError(error)  {
  dbgerror(error)
  ...
}

```

Change the function _onListening_ console.log call to a debug  call.
The Listening on message is printed only if debugging is enabled.

```js
export function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + add.port;
debug (`Listening on ${bind}`);
}
```

<br></br>

## Capturing stdout and stderr

Consider using the package capture-console for use with stdout and stderr messages.

Uncaught exceptions and unhandled rejected Promises.
Implement handlers to _appsupport.mjs_.

```js
process.on('uncaughtException', function(err) {
  console.error(`I've crashed!! - ${(err.stack || err)}`);
});

import * s util from 'util';
process.on('unhandledRejection' , (reason, p) => {
  console.error(`Unhandled Rejection at: ${util:inspect(p)} reason: ${reason}`)
})

```
These are events emitted from the process object. Using an event listener to handle these events.

<br></br>
