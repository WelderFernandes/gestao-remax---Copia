export interface NotesType {
  id: number
  color?: string
  title?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datef?: any | string
  deleted: boolean
}
