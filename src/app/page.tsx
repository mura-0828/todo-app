'use client'
import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [inputValue, setInputValue] = useState<string | null>(null)
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
            onChange={async () => {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ completed: todo.completed }),
                }
              )
              const updateTodo = await response.json()
              setTodos(
                todos.map((todo) => {
                  if (todo.id === updateTodo.id) {
                    return updateTodo
                  } else {
                    return todo
                  }
                })
              )
            }}
          />
          <button
            onClick={async (e) => {
              e.preventDefault()
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                {
                  method: 'DELETE',
                }
              )
              const deleteTodo = await response.json()
              setTodos(todos.filter((todo) => todo.id !== deleteTodo.id))
            }}
          >
            削除
          </button>
        </div>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (!inputValue) alert('入力してください')
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/todo`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title: inputValue }),
            }
          )
          const newTodo = await response.json()

          setTodos([...todos, newTodo])
          setInputValue(null)
        }}
      >
        <input
          type='text'
          className='text-black'
          value={inputValue || ''}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type='submit' value='add' />
      </form>
    </div>
  )
}
