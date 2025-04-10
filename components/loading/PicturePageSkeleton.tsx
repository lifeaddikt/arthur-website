const PicturePageSkeleton = () => {
  return (
    <main className='flex-1 h-[90vh] md:h-[100vh] overflow-hidden flex flex-col justify-between items-center pt-8 px-8 md:pt-16 md:px-16'>
      {/* Top header - visible on both mobile and desktop */}
      <div className='w-full flex justify-between items-start'>
        <div className='h-4 w-32 bg-gray-200 dark:bg-gray-800 animate-pulse' />
        <div className='h-6 w-6 bg-gray-200 dark:bg-gray-800 animate-pulse' />
      </div>

      {/* Main image container */}
      <div className='w-full h-[70%] relative flex items-center justify-center'>
        <div className='w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse' />
      </div>

      {/* Bottom navigation - single block */}
      <nav className='w-full p-2 md:p-6'>
        <div className='h-12 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto' />
      </nav>
    </main>
  )
}

export default PicturePageSkeleton 