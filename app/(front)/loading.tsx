import React from 'react'

const Loading = () => {
  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-theme-black border-t-transparent animate-spin"></div>
        <p className="text-theme-black font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default Loading 