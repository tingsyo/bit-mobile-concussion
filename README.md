# Behavioral Intervention through Mobile Devices: a framework and an example

This repo hosts an example of mobile intervention system for concussion clinic.  The system concsists of two part:

- Mobile App: in the folder `mobile.ionic`. 

- Server App: in the folder `server.meanjs`.

And the folder `doc` contains documentations detail the design and implementation of this system. Following are a short summary about how to get a quick start of this system.

## Quick Start
The system was implemented with fullstack javascript.  The mobile part used `[Ionic](http://ionicframework.com/) framework` and the server part used `[MEAN.JS](http://meanjs.org/)` solution.  Both solutions depnend on `[node.js](https://nodejs.org/)`, so make sure your system has `node`, `npm`, `ionic`, and `MongoDb` installed and configured before you start.

- [Install `node.js` and `npm`](https://nodejs.org/download/)

- [Install `Ionic`](http://ionicframework.com/getting-started/)

- [Install `MongoDb`](https://www.mongodb.org/downloads)

After the dependencies are all set, get the code from this repo:
```shell
git clone https://github.com/tingsyo/bit-mobile-concussion.git
```

And then install the npm modules for both mobile and server app:
```shell
cd bit-mobile-concussion/mobile.ionic
npm install
cd ../server.meanjs
npm install
```

To start the server, go to the server.meanjs directory:
```shell
node srver.js
```

To test the mobile app in a browser, go to the mobile.ionic directory:
```shell
ionic serve
```

Note: the `sync data with server` functionality will not work until a proper `serverurl` is configured in the file `mobile.ionic/www/js/server.js`.


---
# License 
The code is released under a permissive [MIT](http://opensource.org/licenses/MIT) license. This means you can use Ionic in your own personal or commercial projects for free.  
The content of intervention (mainly in the file `mobile.ionic/www/js/server.js`) is the intellectual property of Prof. Yang (© 2014-2015 Yang All Rights Reserved), and any use of the content requires permission from the copyright owner.

