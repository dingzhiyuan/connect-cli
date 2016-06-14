#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var node_path=require('path');
var gulp=require('gulp');
var connect=require('gulp-connect');
var middleware=require('http-proxy-middleware');
var readJson = function(path){
    if(!fs.existsSync(path)){
        return false;
    }
    var t = fs.readFileSync(path);
    return eval('('+ t +')');
};
function cloneObj(oldObj) {
    if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
            var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
    return newObj;
};
function extendObj() {
    var args = arguments;
    if (args.length < 2) return;
    var temp = cloneObj(args[0]);
    for (var n = 1; n < args.length; n++) {
        for (var i in args[n]) {
            temp[i] = args[n][i];
        }
    }
    return temp;
}
var defaults={
    host:'localhost'
    ,port:3000
    ,root:process.cwd()
    ,middleware:[]
};
program
    .version('1.0.0')
    .option('-h, --host [host]', 'the host eg:localhost,eg:www.xxx.com')
    .option('-p, --port [port]', 'the port eg:3000')
    // .option('-r, --root [root]', 'relative path to the cwd folder')
    .parse(process.argv);

/**
 * Error Handling io
 */
var _configs=readJson("connect.json");

var options={}
options=_configs?extendObj(defaults,_configs):defaults;

if(program.host){
   options.host= program.host;
}

if(program.port){
    options.port = program.port;
}

if(program.root){
    options.root = program.root;
}

gulp.task('server', function () {
    connect.server({
        root: options.root
        ,port: options.port
        ,host:options.host
        , livereload: true
        , middleware: function (connect, opt) {
            var _arr=[];
            if(options.middleware.length>0){
                for (var i = 0; i < options.middleware.length; i++) {
                    if(!options.middleware[i].proxy || !options.middleware[i].to){
                        continue;
                    }
                    _arr.push(middleware(options.middleware[i].proxy, { target: options.middleware[i].to }));
                }
                
            }
            return _arr;
        }
    });
});
gulp.task('reload', function () {
    return gulp.src('**/**/*.*').pipe(connect.reload());
});

var watcher = gulp.watch('**/**/*.*', ['reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', reload browser...');
});

gulp.start(['server']);