module.exports = {
    //社保金额
    getList: {
        url: '/operate/FinanceConfigSocial/lists',
        methods: 'get'
    },
    // 社保保存
    cardSave: {
        url: '/operate/FinanceConfigSocial/add',
        methods: 'post'
    },
    // 社保分类删除
    cardDeleteList: {
        url: '/operate/FinanceConfigTax/delete',
        methods: 'get'
    },
     //个税税点
     iconGetList: {
        url: '/operate/FinanceConfigTax/lists',
        methods: 'get'
    },
    // 个税税点保存
    iconSave: {
        url: '/operate/FinanceConfigTax/add',
        methods: 'post'
    },
    // 个税税点删除
    iconDeleteList: {
        url: '/operate/FinanceConfigTax/delete',
        methods: 'get'
    },
     //职位分类
     jobsGetList: {
        url: '/operate/SmallPosition/lists',
        methods: 'get'
    },
    // 职位分类保存
    jobsSave: {
        url: '/operate/SmallPosition/add',
        methods: 'post'
    },
    // 职位分类删除
    jobsDeleteList: {
        url: '/operate/SmallPosition/delete',
        methods: 'get'
    },
    // 其他参数
    otherList: {
        url: '/operate/SmallConfig/detail',
        methods: 'get'
    },
    // 其他参数保存
    otherSave: {
        url: '/operate/SmallConfig/update',
        methods: 'post'
    }
}