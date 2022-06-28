import { ElMessage, ElMessageBox } from 'element-plus'
import { io } from 'socket.io-client'

export function $message(message: string, type: any): any {
  ElMessage({
    message,
    grouping: true,
    type,
    showClose: true,
    offset: 80,
  })
}

export function $alert(text: string, title: string, callback: () => any): any {
  return ElMessageBox.alert(text, title, {
    confirmButtonText: 'OK',
    showClose: false,
    dangerouslyUseHTMLString: true,
    callback,
  })
}
