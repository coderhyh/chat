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
const utils = { $message, $alert, $blobToDataURL }
export const useUtils = () => {
  return { $message, $alert, $blobToDataURL } as typeof utils
}
