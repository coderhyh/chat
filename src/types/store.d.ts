declare namespace App {
  interface Tab {
    title: string
    path: string
  }
}
declare namespace User {
  interface FriendTarget {
    target: string
    type: '@' | 'pai' | ''
  }
}
