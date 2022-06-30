import { ElMessage, ElMessageBox } from 'element-plus'

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

export const $blobToDataURL = (blob: Blob, cb: (base64Url: string) => void) => {
  const reader = new FileReader()
  reader.onload = function (evt: ProgressEvent<FileReader>) {
    const base64 = evt?.target?.result
    cb(base64 as string)
  }
  reader.readAsDataURL(blob)
}

function $isUserExist(): false | 'Exist' | 'Leave' {
  const hiddenProperty =
    'hidden' in document
      ? 'hidden'
      : 'webkitHidden' in document
      ? 'webkitHidden'
      : 'mozHidden' in document
      ? 'mozHidden'
      : null
  if (!hiddenProperty) return false
  return !(document as any)[hiddenProperty] ? 'Exist' : 'Leave'
}

const utils = { $message, $alert, $blobToDataURL, $isUserExist }
// type aaa = {
//   $message: (message: string, type: any) => void
//   $alert: (text: string, title: string, callback: () => any) => void
//   $blobToDataURL: (blob: Blob, cb: (base64Url: string) => void) => void
//   $isUserExist: () => false | 'Exist' | 'Leave'
// }
export const useUtils = () => utils
