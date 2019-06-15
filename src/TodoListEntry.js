import React from "react"

class TodoListEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.selectToDoList.map((addTodoList, index) => (
          <div key={addTodoList + index}>
            {this.props.selectGroupTitle === "완료된 알림" ? (
              <li>{addTodoList}</li>
            ) : (
              <div>
                <input type="radio" />
                {addTodoList}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default TodoListEntry
