'use client'
import Image from 'next/image'
import { useState } from 'react'

type Todo = {
  id: number
  title: string
  completed: boolean
}

const todos: Todo[] = [
  { id: 1, title: 'todo1', completed: false },
  { id: 2, title: 'todo2', completed: false },
  { id: 3, title: 'todo3', completed: true },
]

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  return (
    <div>
      <h1>todo</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <input type='checkbox' checked={todo.completed} />
          <button
            onClick={(e) => {
              e.preventDefault()
              console.log('削除')
            }}
          >
            削除
          </button>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log('送信', inputValue)
          e.currentTarget.reset()
        }}
      >
        <input
          type='text'
          className='text-black'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type='submit' value='add' />
      </form>
    </div>
  )
}
