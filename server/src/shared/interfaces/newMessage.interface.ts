export interface NewMessagePayload {
  message: string
  dateString: string // limitation of Redis payload serialization
  content?: string
  username?: string
}
