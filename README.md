# [![Build Status](https://secure.travis-ci.org/miconblog/parse-react-redux-router-intl.png?branch=master)](https://travis-ci.org/miconblog/parse-react-redux-router-intl) [![Dependency Status](https://david-dm.org/miconblog/parse-react-redux-router-intl/status.svg)](https://david-dm.org/miconblog/parse-react-redux-router-intl) [![devDependency Status](https://david-dm.org/miconblog/parse-react-redux-router-intl/dev-status.svg)](https://david-dm.org/miconblog/parse-react-redux-router-intl#info=devDependencies)

# [ParseSever][1] + [React][2] + [Redux][3] + [Router][4] + [Intl][5] + [Antd][6]

## Installation
    $> npm install
    
## Development with webpack devServer
    $> npm start
 
If you want to save your state to your ParseServer, you have to run it.

    $> cd parse-server
    $> node index.js
    
    
## Production with ParseServer
#### 1. Build your react code and deploy to your ParseServer    

    $> npm run build
    

#### 2. Run MongoDB
if you like [HomeBrew](http://brew.sh/), it is only for MacOS

    $> brew install mongo
    $> mongod --config /usr/local/etc/mongod.conf 


#### 3. Run your ParseServer

    $> cd parse-server
    $> node index.js 
    
    

## Project Structure

    - app/              --- For React
    - parse-server/     --- For ParseServer
    - public/           --- For webpack devServer static root


## How to Contribute
- whatever you want, give me your PR

## Documentation

- [Project Structure - 프로젝트 구조](https://github.com/miconblog/parse-react-redux-router-intl/blob/master/docs/project-structure.md)
- [Coding Convention - 코딩 규칙](https://github.com/miconblog/parse-react-redux-router-intl/blob/master/docs/quick-start.md)
- [Webpack Config - 웹팩 설정하기](https://github.com/miconblog/parse-react-redux-router-intl/blob/master/docs/webpack.md)
- [How to connect Facebook - 페이스북 연동하기](https://github.com/miconblog/parse-react-redux-router-intl/blob/master/docs/how-to-connect-facebook.md)



## Reference

1. i18n 
https://github.com/mxstbr/react-boilerplate

2. async router
http://mxstbr.blog/2016/01/react-apps-with-pages/


[1]:[https://github.com/ParsePlatform/parse-server]
[2]:[https://github.com/facebook/react]
[3]:[http://redux.js.org/]
[4]:[https://github.com/ReactTraining/react-router]
[5]:[https://github.com/yahoo/react-intl]
[6]:[https://ant.design/docs/react/introduce]
