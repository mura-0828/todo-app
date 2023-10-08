'use client'
import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTest = async () => {
      const todos = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`)
      const json = await todos.json()
      setTodos(json)
    }
    getTest()
  }, [])

  return (
    <div>
      <h1>todo</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => console.log('completedを切り替える処理')}
          />
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
