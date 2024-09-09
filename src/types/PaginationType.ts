import type { MentorType } from './MentorType'
import type { PaginationLinksType } from './PaginationLinksType'

interface PaginationType {
  current_page: number
  data: MentorType[] | null
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLinksType[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type { PaginationType }
