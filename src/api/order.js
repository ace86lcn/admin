module.exports = {
    // 工资单列表
    getList: {
        url: '/operate/Payroll/lists',
        methods: 'get'
    },
    // 提醒支付
    pay: {
        url: '/operate/Payroll/noticeFinance',
        methods: 'get'
    }
}