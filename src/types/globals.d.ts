declare interface GlobalProperties {
  $message(message: string, type?: any): () => any
  $alert(text: string, title?: string, callback?: () => any): () => any
  [k: string]: unknown
}
