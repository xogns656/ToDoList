import React from "react"
import TodoListEntry from "./TodoListEntry"

class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }

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
    //총 개수 표현 하기 위함.
    let total = 0
    //reduce가 빈 배열일 경우에 먹히지 않아서 다음과 같은 방법 이용함.
    //될것같은데.. 다시 리팩토링할때 사용해보겠음
    for (let i = 0; i < Object.values(this.props.allData).length; i++) {
      total += Object.values(this.props.allData)[i].length
    }
    return (
      <div>
        {this.props.allData.hasOwnProperty(this.props.selectGroupTitle) ? (
          <div>
            {/*완료목록의 구현을 위해 타이틀을 넘겨준다.*/}
            <TodoListEntry
              selectGroupTitle={this.props.selectGroupTitle}
              selectToDoList={this.props.allData[this.props.selectGroupTitle]}
            />
            {this.props.selectGroupTitle !== "완료된 알림" ? (
              <input onKeyDown={this.inputData.bind(this)} />
            ) : (
              undefined
            )}
          </div>
        ) : (
          <div>
            총 알림 갯수 ={total} :, 남은알림갯수 : {total}
          </div>
        )}
      </div>
    )
  }
}
export default TodoList
