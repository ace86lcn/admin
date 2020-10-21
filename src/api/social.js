module.exports = {
    // 社保单列表
    getList: {
        url: '/operate/SocialRecord/lists',
        methods: 'get'
    },
    // 缴纳成功
    paySuccess: {
        url: '/operate/SocialRecord/adopt',
        methods: 'post'
    },
    // 缴纳失败
    payFinal: {
        url: '/operate/SocialRecord/fail',
        methods: 'post'
    },
    // 社保详情
    detail: {
        url: '/operate/SocialRecord/detail',
        methods: 'get'
    }
}