import useSWR from "swr"
import dayjs from "dayjs"

const fetcher = (url) => fetch(url).then((res) => res.json())

const tableRowItem = function (item) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
      <td>{item.done ? 'Sim' : 'Não'}</td>
      <td>{item.finishedAt}</td>
    </tr>
  )
}

export default function Home() {

  const { data, error } = useSWR('/api/todos', fetcher)

  if (!data) return <div>Carregando...</div>

  return (
    <div>
      <table>
        <thead>

          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Descricao</th>
            <th>Criado em</th>
            <th>Finalizado</th>
            <th>Finalizado em</th>
          </tr>

        </thead>

        <tbody>
          {data.map((item) => tableRowItem(item))}
        </tbody>

      </table>
    </div>
  )
}
