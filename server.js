
    const express = require('express'); //引入express模块

    //自定义模块 memoController
    let memoController = require('./controller/memoController');


    let server = express(); //创建服务

    server.set('view engine', 'ejs');   //创建视图引擎

    server.use('/public', express.static('public'));//将静态文件转化为模块

    memoController(server);

    server.listen(3000);    //创建监听