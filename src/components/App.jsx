import React, { Component, Fragment } from 'react'
import { DragDropContext, } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;

`

import initialData from './initial-data'

import Column from './column'

class App extends Component {
    state = initialData

    onDragEnd = ({source, destination, draggableId }) => {
      document.body.style.color =  'inherit'
      document.body.style.backgroundColor = 'inherit'
      if (!destination){
        return
      }
      if (destination.droppableId === source.droppableId && destination.index === source.index ){
        return
      }

      const start = this.state.columns[source.droppableId]
      const finish = this.state.columns[destination.droppableId]

      if (start === finish){
        
        const newTaskIds = Array.from(start.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
          ...start,
          taskIds: newTaskIds
        }

        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn
          }
        }
        return console.log(newState)
      }

      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }
      const finishIds = Array.from(finish.taskIds)
      finishIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      return this.setState(newState)

    }

    
    render() {
        return (
          <DragDropContext onDragEnd={this.onDragEnd} >
            <Container>
              {
                this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId] 
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])


                  return (
                    <Column key={column.id} column={column} tasks={tasks}/>
                  )
                })
              }
            </Container>
          </DragDropContext>
            
        );
    }
} 

export default App;
