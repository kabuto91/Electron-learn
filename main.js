var electron = require('electron');     //引入Electron模块、

var app = electron.app      //创建electron引用

var globalShortcut = electron.globalShortcut;

var BrowserWindow = electron.BrowserWindow;     //创建窗口引用

var mainWindow = null;      //声明要打开的主窗口
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width:800, 
        height:800,
        webPreferences:{
            nodeIntegration:true,   //是否集成nodejs
            enableRemoteModule:true,    //必须有，否则require(electron).remote.BrowserWindow为空
            contextIsolation:false  //渲染进程 require is not defined
        },
        
    })     //设置打开的窗口大小
    globalShortcut.register('ctrl+e',()=>{
        mainWindow.loadURL('https://jspang.com');
    })

    let isRegister = globalShortcut.isRegistered('ctrl+e')?'Register Success':'Register failure';
    console.log(isRegister)

    require('./main/menu.js');
    mainWindow.loadFile('demo7.html')   //加载那个页面
    mainWindow.webContents.openDevTools();  //打开页面就打开调试控制台

    /* var BrowserView = electron.BrowserView //引入BrowserView
    var view = new BrowserView()   //new出对象
    mainWindow.setBrowserView(view)   // 在主窗口中设置view可用
    view.setBounds({x:0,y:100,width:1200, height:800})  //定义view的具体样式和位置
    view.webContents.loadURL('https://jspang.com')  //wiew载入的页面
 */
    //监听关闭时间，把主窗口设置为null
    mainWindow.on('close',()=>{
        mainWindow = null
    })
})

app.on('will-quit',function(){
    //注销全局快捷键方法
    globalShortcut.unregister('ctrl+e');
    globalShortcut.unregisterAll();
})

