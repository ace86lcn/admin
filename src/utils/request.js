import axios from 'axios'
import { Message } from 'element-ui'
import VueCookies from 'vue-cookies'
import store from '../store'

// 创建axios实例
// const service = axios.create({
//   baseURL: process.env.VUE_APP_API_URL,
//   timeout: 5000, // 请求超时时间
//   headers: {
//     'Content-type': 'application/json'
//   },
//   withCredentials: true
// })

// 请求域名
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// 请求超时时间
axios.defaults.timeout = 8000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// request拦截器
axios.interceptors.request.use(
  config => {
    const token = VueCookies.get('cs_admin_token')
    if (token) {
      config.headers['operate-auth-token'] = token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response拦截器
axios.interceptors.response.use(    
  response => {      
      if (response.status === 200) {            
          return Promise.resolve(response);        
      } else {            
          return Promise.reject(response);        
      }    
  },
  // 服务器状态码不是200的情况    
  error => {        
      if (error.response.status) {            
          switch (error.response.status) {             
              // 404请求不存在                
              case 404:             
                  Message({
                      showClose: true,
                      message: '网络请求不存在',
                      type: 'error'
                  })                         
              break;                
              // 其他错误，直接抛出错误提示                
              default:                    
                  Message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error'
                  })          
          }            
          return Promise.reject(error.response);        
      }       
  }
);

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
// 请求，并对请求方法进行判断
export default function request(api, params = {}) {
  if(api.methods == 'post') {
      return new Promise((resolve, reject) => {         
          axios.post(api.url, params)        
          .then(res => {             
              if(res.data.code !== 200) {
                  Message({
                      showClose: true,
                      message: res.data.msg,
                      type: 'error'
                  })  
              }   
              resolve(res);        
          })        
          .catch(err => {            
              reject(err.data)        
          })    
      });
  } else if(api.methods == 'get') {
      return new Promise((resolve, reject) =>{        
          axios.get(api.url, {            
              params: params        
          })        
          .then(res => {       
              if(res.data.code !== 200) {
                  Message({
                      showClose: true,
                      message: res.data.msg,
                      type: 'error'
                  })  
              }
              if(res.data.code == 1403) {
                  // 未登录或登录过期
                  this.$cookies.remove('cs_admin_token')
              }
              resolve(res);        
          })        
          .catch(err => {         
              reject(err.data)    
          })    
      });
  }
}
