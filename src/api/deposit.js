module.exports = {
    /* 
    *  接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
    *   }
    *  用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

    // 企业保证金列表
    getList: {
        url: '/operate/FinanceInfo/lists',
        methods: 'get'
    },
}