import React, { useState } from 'react'
import shortid from 'shortid'

function App() {
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault()

    if (!tarea.trim()) {
      console.log('No hay tarea')
      setError('Escriba algo ...')
      return
    }

    setTareas([...tareas, { id: shortid.generate(), tarea: tarea }])
    setTarea('')
    setError('')
  }

  const eliminarTarea = (id) => {
    console.log(id)

    const arrayFiltrado = tareas.filter((item) => {
      return item.id !== id
    })

    setTareas(arrayFiltrado)
  }

  const editar = (item) => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const editarTarea = (e) => {
    e.preventDefault()

    if (!tarea.trim()) {
      console.log('Esta vacio')
      setError('Escriba algo')
      return
    }

    const arrayEditado = tareas.map((item) => {
      return item.id === id ? { id: id, tarea: tarea } : item
    })

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container">
      <h1 className="text-center">CRUD PRINCIPAL</h1>
      <hr />
      <div className="row mb-5">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">
                <span className="text-center lead">No hay tareas</span>
              </li>
            ) : (
              tareas.map((item) => {
                return (
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.tarea}</span>
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? 'Editar tarea' : 'Agregar tarea'}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              placeholder="Escribe una tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-warning btn-block">
                Editar tarea
              </button>
            ) : (
              <button className="btn btn-dark btn-block">Agregar tarea</button>
            )}
          </form>
        </div>
      </div>
      <div className="mt-5">
        <h6 className="text-left">By Carlos de Jesús Alberto Lira</h6>
      </div>
    </div>
  )
}

export default App
