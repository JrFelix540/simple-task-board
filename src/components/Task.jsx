import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background: #fff;
    display: flex;
`



export default class Task extends Component {
    render(){

        const isDragDisabled = this.props.isDragDisabled
        return (
            <Fragment>
                <Draggable 
                draggableId={this.props.task.id} 
                index={this.props.index} 
                isDragDisabled={false}
                > 
                    {
                        (provided, snapshot) => (
                            <Container 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps} 
                            
                            ref={provided.innerRef}
                           
                            >
                               
                                { this.props.task.content }
                            </Container>
                        )
                    }
                    
                </Draggable>
            </Fragment>
        
          
        )
    }
}