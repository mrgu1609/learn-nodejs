> 主讲人柯嘉诚 - [演讲ppt](https://docs.google.com/presentation/d/1zewGYKlBBXacKCRKLierymJjKYlnVCwXd8ZjJLNgJsc/edit#slide=id.p)

# process

## 介绍
process对象是一个全局变量，它提供当前 Node.js 进程的有关信息。使用process对象可以截获进程的异常、退出等事件，也可以获取进程的当前目录、环境变量、内存占用等信息，还可以执行进程退出、工作目录切换等操作。

## 内容

根据类别，将process的API具体分为3大类：1.process监听事件；2.process事件；3.process属性。

### process监听事件

process监听事件是EventEmitter的实例。

它主要有以下事件
```js
'beforeExit'事件
'disconnect'事件
'exit' 事件
'message' 事件
'multipleResolves'事件
'rejectionHandled' 事件
'uncaughtException' 事件
'unhandledRejection' 事件
'warning' 事件
信号事件

//示例
process.on('exit', (code) => {
  console.log(`即将退出，退出码：${code}`);
});
```

以上这些异常处理的事件，能增加代码的健壮性，利于bug的排查。

### process事件

process事件与监听事件的区别：前者不是基于eventEmitter的实例。

接下来介绍几个常见的事件。

#### process.cwd()
该方法返回Node.js进程当前工作的目录。

```js
console.log('Current directory: ${process.cwd()}');
```

#### process.nextTick(callback[, ...args])
该方法会将callback添加到"next tick"队列。一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。而且会在任何I/O事件（包括定时器）之前运行。

```js
process.nextTick(() => {
  console.log('nextTick callback');
});
```

#### process.kill(pid[, signal])
该方法，将根据pid杀死进程

```js
process.kill(process.pid);
```

#### process.exit([code])
该方法以结束状态码code指示Node.js同步终止进程。

```js
process.exit(1);
```

### process属性

接下来介绍几个常见的属性。

#### process.env
这个属性作为前端应该都很熟悉，返回环境信息。

#### process.pid
该属性返回进程的pid

# child_process

## 介绍

child_process 模块提供了衍生子进程的功能。

## 内容

创建子进程的主要几个方法
- child_process.spawn()    
- child_process.spawnSync()    
- child_process.exec()    
- child_process.execSync()    
- child_process.execFile()    
- child_process.execFileSync()    
- child_process.fork()

其中上述的的后五个方法都是基于前两个方法拓展的。在本文中主要介绍几个异步方法。

### child_process.spawn()

该方法使用给定的 command 和 args 中的命令行参数来衍生一个新进程。 如果省略 args，则默认为一个空数组。

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
```

### child_process.exec()   
该方法衍生一个 shell 并在 shell 中执行 command，且缓冲任何产生的输出。 

```js
const { exec } = require('child_process');
exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
```

### child_process.execFile() 
child_process.execFile() 函数类似 child_process.exec()，除了不衍生一个 shell。

```js
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

### child_process.fork()
child_process.fork() 方法是 child_process.spawn() 的一个特殊情况，专门用于衍生新的 Node.js 进程。 

```js
const { fork } = require('child_process')
const child = fork('./child.js')

child.on('message', (msg) => {
    console.log(msg)
})

child.send('hehe')
```