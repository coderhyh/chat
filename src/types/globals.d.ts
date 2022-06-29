declare interface GlobalProperties {
  $message(message: string, type?: any): () => any
  $alert(text: string, title?: string, callback?: () => any): () => any
  [k: string]: unknown
}

declare interface FriendListList {
  msg: string
  name: string
  right: boolean
  date: string
}

declare interface FriendList {
  name: string
  userId: string
  avatar: string
  list: FriendListList[]
}
