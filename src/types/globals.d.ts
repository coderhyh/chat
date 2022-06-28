declare interface GlobalProperties {
  $message(message: string, type?: any): () => any
  $alert(text: string, title?: string, callback?: () => any): () => any
  [k: string]: unknown
}

interface FriendListList {
  msg: string
  name?: string
  right?: boolean
  date: string
}

declare interface FriendList {
  name: string
  msg: string
  date: string
  id: string
  avatar: string
  list: FriendListList[]
}
