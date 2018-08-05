
    //引入mongoose模块
    const mongoose = require('mongoose');
    //连接数据库
    mongoose.connect('mongodb://memoapp:awfnms745121@ds153841.mlab.com:53841/memo');
    // 创建图表
    let memoSchema = new mongoose.Schema({
        item : String
    });
    // 向数据库中存储数据
    let Memo = mongoose.model('Memo', memoSchema);

    // Memo({item : 'Hello Everyone!'}).save(function (err, data) {
    //     if(err) throw err;
    //     console.log('Item saved');
    // });

    const bodyParser = require('body-parser');

    //对数据进行解析
    let urlencodeParser = bodyParser.urlencoded({extended : false});

    // let data = [
    //     {item: '欢迎使用好记性记事本!'},
    //     {item: '它可以帮你养成写记事的 \"好记性\" !'},
    // ];

    module.exports = function (server) {
        // 获取数据
        server.get('/memo', function (req, res) {
            Memo.find({}, function (err, data) {
                if(err) throw err;
                res.render('memo', {memos: data});
            });
        });

        // 传递数据
        server.post('/memo', urlencodeParser, function (req, res) {
            Memo(req.body).save(function (err, data) {
               if(err) throw err;
               res.json(data);
            });
            // data.unshift(req.body);
        });

        // 删除数据
        server.delete('/memo/:item', function (req, res) {
            // console.log(req.params.item);
            Memo.find({item : req.params.item}).remove(function (err, data) {
                if(err) throw err;
                res.json(data);
            });
            // data = data.filter(function (memo) {
            //     return req.params.item !== memo.item;
            // });
            // res.json(data);
        });
    };