import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Home from '../views/Home'
import store from '../store'

Vue.use(VueRouter)

/**
 * hidden: 不在侧边栏显示 meta里还有一个hidden
 * noLogin： 不需要登录
 * 
 */

const routes = [
  { path: '/login', name: 'login', hidden: true, meta: { title: '登录', noLogin: true }, component: () => import('../views/login') },
  { path: '/404', name: '404', hidden: true, meta: { title: '404', noLogin: true }, component: () => import('../views/404') },
  {
    path: '/',
    component: Home,
    name: '企业管理',
    iconCls: '',
	redirect: '/company/1',
    meta: {
      title: '企业管理'
    },
    children:[
      { path: '/company/1', name: '企业认证', meta: { title: '企业认证' }, component: () => import('../views/company/1') },
	  { path: '/company/2', name: '企业列表', meta: { title: '企业列表' }, component: () => import('../views/company/2')},
	  { path: 'company/detail/:id', name: '企业详情', meta: { hidden: true, title: '企业详情' }, component: () => import('../views/company/detail') }
    ]
  },
  {
    path: '/staff',
    component: Home,
    name: '员工管理',
    iconCls: '',
    meta: {
      title: '员工管理'
    },
    children:[
      { path: '/staff/check', name: '员工认证', meta: { title: '员工认证' }, component: () => import('../views/staff/check') },
      { path: '/staff/list', name: '员工列表', meta: { title: '员工列表' }, component: () => import('../views/staff/list') },
      { path: '/staff/detail/:id', name: '员工详情', meta: { hidden: true, title: '员工详情' }, component: () => import('../views/staff/detail') },
    ]
  },
  {
    path: '/order',
    component: Home,
    name: '工资单管理',
    iconCls: '',
    meta: {
      title: '工资单管理'
    },
    children:[
      { path: '/order/1', name: '工资单待支付', meta: { title: '工资单待支付' }, component: () => import('../views/order/1') },
      { path: '/order/2', name: '工资单发放中', meta: { title: '工资单发放中' }, component: () => import('../views/order/2') },
      { path: '/order/3', name: '工资单已完成', meta: { title: '工资单已完成' }, component: () => import('../views/order/3') },
      { path: '/order/4', name: '工资单发放异常', meta: { title: '工资单发放异常' }, component: () => import('../views/order/4') },
      { path: '/order/5', name: '工资单发放失败', meta: { title: '工资单发放失败', defaultRouter: '/order/5' }, component: () => import('../views/order/5') },
      { path: '/order/detail/:id', name: '工资单详情', meta: {hidden: true, title: '工资单详情' }, component: () => import('../views/order/detail') }
    ]
  },
  {
    path: '/social',
    component: Home,
    name: '社保单管理',
    iconCls: '',
    meta: {
      title: '社保单管理'
    },
    children:[
      { path: '/social/1', name: '社保单处理中', meta: { title: '社保单处理中' }, component: () => import('../views/social/1') },
      { path: '/social/2', name: '社保单已实缴', meta: { title: '社保单已实缴' }, component: () => import('../views/social/2') },
      { path: '/social/3', name: '社保单缴纳失败', meta: { title: '社保单缴纳失败' }, component: () => import('../views/social/3') },
      { path: '/social/detail', name: '社保单详情', meta: {hidden: true, title: '社保单详情' }, component: () => import('../views/social/detail') }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',      
    iconCls: '',
    leaf: true,//只有一个节点
    children:[
      { path: '/deposit', name: '企业保证金', meta: { title: '企业保证金' }, component: () => import('../views/deposit') }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',      
    iconCls: '',
    leaf: true,//只有一个节点
    children:[
      { path: '/sim', name: '手环SIM卡绑定', meta: { title: '手环SIM卡绑定' }, component: () => import('../views/sim') }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',      
    iconCls: '',
    leaf: true,//只有一个节点
    children:[
      { path: '/tax', name: '税务管理', meta: { title: '税务管理' }, component: () => import('../views/tax') }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',      
    iconCls: '',
    leaf: true,//只有一个节点
    children:[
      { path: '/serve', name: '服务费管理', meta: { title: '服务费管理' }, component: () => import('../views/serve') }
    ]
  },
  {
    path: '/invoice',
    component: Home,
    name: '发票管理',
    iconCls: '',
    meta: {
      title: '发票管理'
    },
    children:[
      { path: '/invoice/1', name: '开具中', meta: { title: '开具中' }, component: () => import('../views/invoice/1') },
      { path: '/invoice/2', name: '已开具', meta: { title: '已开具' }, component: () => import('../views/invoice/2') },
      { path: '/invoice/detail', name: '发票详情', meta: {hidden: true, title: '发票详情' }, component: () => import('../views/invoice/detail') }
    ]
  },
  {
    path: '/param',
    component: Home,
    name: '参数配置',
    meta: {
      title: '参数配置'
    },      
    iconCls: '',
    leaf: false,//只有一个节点
    children:[
      { path: '/param/jobs', name: '职位分类', meta: { title: '职位分类' }, component: () => import('../views/param/jobs') },
      { path: '/param/iconcome', name: '个税税点', meta: { title: '个税税点' }, component: () => import('../views/param/iconcome') },
      { path: '/param/cards', name: '社保金额', meta: { title: '社保金额' }, component: () => import('../views/param/cards') },
      { path: '/param/rule', name: '其他参数', meta: { title: '其他参数' }, component: () => import('../views/param/rule') },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: '',
    leaf: true,
    children: [
      {path: '/banner', name: 'banner管理', meta: {title: 'banner管理'}, component: () => import('../views/banner/index')}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',      
    iconCls: '',
    leaf: true,//只有一个节点
    children:[
      { path: '/feed', name: '用户反馈', meta: { title: '用户反馈' }, component: () => import('../views/feed/index') }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.hidden) {
      to.meta.defaultActive = from.path
    }
    if(!VueCookies.get('cs_admin_token') && !to.meta.noLogin) {
        alert('请您先登录')
        next('/login')
    } else {
        next()
    }
    // next()
  // if(!store.state.token && !to.meta.noLogin) {
  //     alert('请您先登录')
  //     next('/login')
  // } else {
  //     next()
  // }
})

router.afterEach((to, from) => {
  let title = to.meta.title
  if (title) document.title = title
})

export default router
