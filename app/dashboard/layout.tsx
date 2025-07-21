import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen'>
      <main className='pl-16 md:pl-64 pt-0 min-h-screen'>
        <div className='max-w-6xl mx-auto p-4 md:p-8'>
          {children}
        </div>
      </main> 
    </div>
  )
}

export default layout
