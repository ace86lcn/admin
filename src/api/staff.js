module.exports = {
    // 员工列表
    getList: {
        url: '/operate/SmallProjectWorker/lists',
        methods: 'get'
    },
    // 详情
    detail: {
        url: '/operate/SmallProjectWorker/details',
        methods: 'get'
    },
    // 操作
    edit: {
        url: '/operate/SmallProjectWorker/update',
        methods: 'post'
    }
}