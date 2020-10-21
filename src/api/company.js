module.exports = {
    /* 
    *  接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
    *   }
    *  用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

    // 企业认证列表
    approveList: {
        url: '/operate/SmallCompany/lists',
        methods: 'get'
    },
    // 企业列表
    companyList: {
        url: '/operate/SmallCompany/lists',
        methods: 'get'
    },
    // 通过or拒绝认证
    edit: {
        url: '/operate/SmallCompany/edit',
        methods: 'get'
    },
}