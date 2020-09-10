export interface NewMessagePayload {
  zone: string
  token?: string
  message: string
  date: Date // limitation of Redis payload serialization
  content?: string
  username?: string
}
