import React from "react"
import TodoListEntry from "./TodoListEntry"

class TodoList extends React.Component {
  inputData(event) {
    //만약 엔터를 친다면
    if (event.keyCode === 13 && event.target.value.length) {
      //해당 데이터를 업데이트 시켜주고
      this.props.allData[this.props.selectGroupTitle].push(event.target.value)
      //데이터를 내려준 App 컴포넌트에 반영시켜준다.
      this.props.outputData(this.props.allData)
    }
  }

  render() {
    return (
      <div>
        {this.props.allData.hasOwnProperty(this.props.selectGroupTitle) ? (
          <div>
            {/*완료목록의 구현을 위해 타이틀을 넘겨준다.*/}
            <TodoListEntry
              allData={this.props.allData}
              searchData={this.props.searchData}
              selectGroupTitle={this.props.selectGroupTitle}
              selectToDoList={this.props.allData[this.props.selectGroupTitle]}
              completeData={this.props.completeData}
            />
            {this.props.selectGroupTitle !== "완료된 알림" ? (
              <input onKeyDown={this.inputData.bind(this)} />
            ) : (
              undefined
            )}
          </div>
        ) : (
          undefined
        )}
      </div>
    )
  }
}
export default TodoList
