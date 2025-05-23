import Link from 'next/link'

const Badge = ({
  text,
  active,
  collection,
  id,
}: {
  text: string
  active: boolean
  collection: string
  id?: number
}) => {
  return (
    <Link
      href={
        text === 'All' ? `/${collection}` : `/${collection}?activeSerie=${id}`
      }
      className={`cursor-pointer border p-2 text-sm transition-all uppercase ${
        active
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {text}
    </Link>
  )
}

export default Badge
