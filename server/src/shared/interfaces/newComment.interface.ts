export interface NewCommentPayload {
  name: string
  dateString: string // limitation of Redis payload serialization
  content?: string
  nickname?: string
}
