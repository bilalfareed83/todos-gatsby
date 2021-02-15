import { useMutation, useQuery } from "@apollo/client"
import React from "react"
import gql from "graphql-tag"



const GET_TODO = gql`
  {
    todos {
      id
      status
      task
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($task: String!) {
    addTodo(task: $task) {
      task
    }
  }
`

export default function Home() {

let inputText,

const [addTodo]= useMutation(ADD_TODO)

const addTask = ()=>{
  addTodo({
    variables: {
      task: inputText.value
    },
    reFatchQueries: [{query: GET_TODO}]
  })
  inputText.value = ''
}

  const { loading, error, data } = useQuery(GET_TODO)

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Error</h2>
  return (
    <div>
      <label>Add Task
        <br/>
        <input type="text" ref={node => {
          inputText = node
        }} />
      </label>
      <button onClick={addTask}>Add Task</button>
      <h2>Todo List</h2>
      
    </div>
  )
}
