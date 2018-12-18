module.exports = {
    devServer: {
        https: false, 
        host: '127.0.0.1',
        port: '8081',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
    
}