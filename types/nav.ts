import { PhotographiesCollection } from '@/payload-types'

export interface NavbarProps {
  collections: PhotographiesCollection[]
}

export interface MenuLinksProps {
  collections: PhotographiesCollection[]
  setOpen: (open: boolean) => void
} 