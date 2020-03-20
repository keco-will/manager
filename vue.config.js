module.exports = {
    devServer: { // 开发环境下runtime
      proxy: { // 代理服务器
        // 接口地址为 http://127.0.0.1:7001/api/register
        '/': { 
          target: 'http://212.64.87.193:8080',
          secure: false, //是否使用 Https安全传输协议
          changeOrigin: true 
        },
        
       
      }
    }
  }
  
  