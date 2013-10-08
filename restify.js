/**
 * Created with JetBrains WebStorm.
 * User: LvYong
 * Date: 13-9-24
 * Time: 上午10:40
 * To change this template use File | Settings | File Templates.
 */
var restify = require('restify');
var UglifyJS = require("uglify-js");


function respond(req, res, next) {
    var options = {fromString: true};
    if (req.params.options)
        options = eval('(' + req.params.options + ')');
    var result = UglifyJS.minify(req.params.jscode, options);

    console.log(result.code); // minified output
    console.log(result.map);

    res.contentType = 'text/plain';

    res.send(result.code);
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.post('/uglifyjs/:api', respond);


server.listen(18080, function () {
    console.log('%s listening at %s', server.name, server.url);
});