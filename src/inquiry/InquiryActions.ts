export type Action = {
  type: '_INQUIRY_ANSWERED',
  requestPath: string,
  data: string
} | {
  type: '_INQUIRY_INCOMING_MESSAGE',
  data: string
} | {
  type: '_INQUIRY_ASK',
  data: string
} | {
  type: '_INQUIRY_SEND_TEXT',
  data: string
} | {
  type: '_INQUIRY_INCOMING_INTENT',
  data: object
} | {
  type: '_INQUIRY_CLEAR_RESPONSES'
}
