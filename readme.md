# Connect CLI

A command line wrapper for server connect and livereload


## Install

`npm install --g connect-cli`

## Usage

Pxtorem CLI takes 3 arguments:

|Argument|Alias|Default|Description|
|---|---|---|---|
|`--host`|`-h`|`n/a`|the host eg:localhost,eg:www.xxx.com|
|`--port`|`-p`|`n/a`|the port eg:3000|

## Example
cd you website folder

`connect -h www.xxx.com -p 8888`

all args is not a must.


## Without arguments

cd you website folder

`connect`

it will use default options.

## Default options


`{
    host:'localhost'
    ,port:3000
    ,middleware:[]
}`

but you can create a "connect.json" file in the cwd folder to rewrite the options

## Middleware

the "connect.json" will be like:

`{
	host:'www.xxx.com'
    ,port:8080
	,"middleware":[{
		"proxy":"/xxx/",
		"to":"http://192.168.1.100:8888/"
	},{
		"proxy":"/xxxx/",
		"to":"http://192.168.1.101:8888/"
	}]
}`

## About host

if use a domain name as host,you must add a record in you host file in you system.

like:

127.0.0.1 www.xxx.com 
