import React from 'react'

function EmptyState({ onAdd }) {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <div className='text-6xl mb-4'>📋</div>
      <h2 className='text-2xl font-semibold mb-2 dark:text-white'>No Habits Yet</h2>
      <p className='text-gray-600 dark:text-gray-400 mb-6'>Start building better habits today</p>
      <button onClick={onAdd} className='neon-button'>Create your first habit</button>
    </div>
  )
}

export default EmptyState
