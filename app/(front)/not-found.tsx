import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-6xl font-light mb-2'>404</h1>
        <p className='mb-4 text-gray-600'>Page not found</p>
        <Link
          href='/'
          className='text-sm underline text-gray-500 hover:text-gray-800'
        >
          Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
