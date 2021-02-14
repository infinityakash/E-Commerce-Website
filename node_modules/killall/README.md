killall 
=============

a npm for kill -9 all processes

[![npm version](https://badge.fury.io/js/killall.svg)](http://badge.fury.io/js/killall)

以前每次都这样杀掉所有进程

	ps -ef|grep pm2|awk '{print $2}'|xargs kill -9
	
写起来比较麻烦，于是写了`killall`这个cli工具，其实我只要输入进程名称就可以杀掉所有相关进程

## 安装

	sudo npm install -g killall

## 用法

	killall pm2
	killall node

## 测试

当前目录启动

	gulp
	
然后随便执行

	killall gulp
	
如果发现gulp中断，即表示杀死进程成功。

	
## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## 版本历史

- v0.1.0 初始化版本

## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).