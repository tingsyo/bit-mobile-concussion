# bit-mobile-concussion
## Behavioral Intervention through Mobile Devices: a framework and an example

This repo hosts an example of mobile intervention system for concussion clinic.  The system consists of two part:

- Mobile App: in the folder `mobile.ionic`.

- Server App: in the folder `server.meanjs`.

And the folder `doc` contains documentations detail the design and implementation of this system. Following are a short summary about how to get a quick start of this system.

## Quick Start
The system was implemented with full-stack javascript.  The mobile part used `[Ionic](http://ionicframework.com/) framework` and the server part used `[MEAN.JS](http://meanjs.org/)` solution.  Both solutions depend on `[node.js](https://nodejs.org/)`, so make sure your system has `node`, `npm`, `ionic`, and `MongoDb` installed and configured before you start.

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

To start the server, go to the `server.meanjs` directory:
```shell
node srver.js
```

To test the mobile app in a browser, go to the `mobile.ionic` directory:
```shell
ionic serve
```

###Note:
- the `sync data with server` functionality will not work until a proper `serverurl` is configured in the file `mobile.ionic/www/js/server.js`.

- to build actual moble apps, please see [Ionic documentation](http://ionicframework.com/getting-started/).

---
# License
The code is released under a permissive [MIT](http://opensource.org/licenses/MIT) license. This means you can use Ionic in your own personal or commercial projects for free.  
The copyright of the intervention content and the delivery mechanisms (mainly in the file `mobile.ionic/www/js/server.js`) is owned by [Dr. YANG, Chi-Cheng](http://163.25.111.53/YCC/YCC_index.htm), [Ms. Lin, Rong-Syuan](#), and [Ms. Lai, Wen-Hsuan](#). (© 2014-2015 Yang All Rights Reserved). [Permissions must be obtained](ccy.tbiteam@gmail.com) for any type of use of the content.
