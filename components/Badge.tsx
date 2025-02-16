import Link from 'next/link'

const Badge = ({
  text,
  active,
  collection,
  id
}: {
  text: string
  active: boolean
  collection: string
  id?: number
}) => {
  return (
    <Link
      href={text === 'All' ? `/${collection}` : `/${collection}?activeSerie=${id}`}
      className={`cursor-pointer border border-theme-black p-2 text-sm transition-all ${
        active ? 'bg-theme-black text-theme-white' : 'text-theme-black hover:bg-gray-700'
      }`}
    >
      {text}
    </Link>
  )
}

export default Badge
