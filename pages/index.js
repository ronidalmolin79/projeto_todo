import Head from "next/head"
import useSWR from "swr"
import TodoForm from "components/Todoform"

const fetcher = (url) => fetch(url).then((res) => res.json())

const removeTodo = (todoId) => {
  fetch('api/todos?id=' + todoId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'aplicattion/json'
    }
  })
}

const tableRowItem = (item) => {
  return (
    <div key={item.id} className="list-item">
      <input type="checkbox" />
      <div>{item.title}</div>
      <button onClick={() => removeTodo(item.id)}>x</button>
    </div>
  )
}

export default function Home() {

  const { data, error } = useSWR('/api/todos', fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to Load</div>
  if (!data) return <div>Carregando...</div>

  return (
    <div>
      <Head>
        <title>To-do</title>
        <meta name="description" content="To-Do NextJS" />
      </Head>

      <TodoForm />

      <div className='list'>
        {data.map((item) => tableRowItem(item))}
      </div>

    </div>
  )
}
