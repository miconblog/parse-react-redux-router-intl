# ParseSever + React + Redux + Router

## Installation
    $> npm install
    
## Development with webpack devServer
    $> npm start
    
    
## Production with parse-server
#### 1. Build your react code and deploy to your parse-server/    

    $> npm run build
    

#### 2. Run MongoDB
if you like [HomeBrew](http://brew.sh/), it is only for MacOS

    $> brew install mongo
    $> mongod --config /usr/local/etc/mongod.conf 


#### 3. Run your parse-server

    $> cd parse-server
    $> node routes.js 
    
    

## Project Structure

    - app/              --- For React
    - parse-server/     --- For ParseServer
    - public/           --- For webpack devServer static root



## Reference

1. i18n 
https://github.com/mxstbr/react-boilerplate

2. async router
http://mxstbr.blog/2016/01/react-apps-with-pages/
