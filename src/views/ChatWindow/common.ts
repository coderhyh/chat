const { $blobToDataURL } = useUtils()

// 系统通知
let timer = true
export const systematicNotification = (e: FriendListMsg) => {
  if (!timer) return
  timer = false
  const body = e?.type === 'image' ? `${e?.name}: [涩涩图]` : `${e?.name}: ${e?.msg}`
  new Notification('新消息', {
    body,
    silent: true,
    icon: 'https://www.coderhyh.top/logo.png',
  })
  setTimeout(() => (timer = true), 5000)
}

// 粘贴图片
export const handlePaste = (event: ClipboardEvent): Promise<string> => {
  return new Promise((resolve, inject) => {
    const items = event?.clipboardData?.items
    let file = null
    if (!items || items.length === 0) {
      // 当前浏览器不支持本地
      inject('null')
      return
    }
    if (items?.[0].type.indexOf('image') !== -1) file = items?.[0].getAsFile()
    if (!file) {
      inject('null')
      return
    }

    $blobToDataURL(file, (base64Url: string) => {
      resolve(base64Url)
    })
  })
}
