import { Message, MessageBox } from 'element-ui'

let _common = {}

_common = {
    Error,
    Success,
    Warning,
    MsgBox
}

export default _common

export function Error(text = '错误',) {
    Message({
      message: text,
      type: 'error',
      duration: 3 * 1000
    })
  }
  
  export function Success(text = '成功') {
    Message({
      message: text,
      type: 'success',
      duration: 3 * 1000
    })
  }
  
  export function Warning(text = '警告') {
    Message({
      message: text,
      type: 'warning',
      duration: 3 * 1000
    })
  }

  export function MsgBox(text = '这是一段文字') {
    return MessageBox.confirm(text, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true
    })
  }