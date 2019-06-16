import React from "react"
const completeDate = require("moment")

class TodoListEntry extends React.Component {
  forCheck(event) {
    //라디오버튼에 체크가되면 '완료된 알림'목록으로 이동시킨다.
    if (event.target.value) {
      this.props.allData["완료된 알림"].push(
        event.target.value + "\t\t" + completeDate().format("YY. M. D, h:mm a")
      )
      //원본배열에서 클릭한 인자와 같은 것을 지워준다.
      this.props.allData[this.props.selectGroupTitle].splice(
        this.props.allData[this.props.selectGroupTitle].indexOf(event.target.value),
        1
      )
    }
    //업데이트가 완료된 데이터를 상단으로 보내준다.
    this.props.completeData(this.props.allData)
  }

  render() {
    //총 개수 표현 하기 위함.
    let total = 0
    //reduce가 빈 배열일 경우에 먹히지 않아서 다음과 같은 방법 이용함.
    //될것같은데.. 다시 리팩토링할때 사용해보겠음
    for (let i = 0; i < Object.values(this.props.allData).length; i++) {
      total += Object.values(this.props.allData)[i].length
    }
    //
    //  <div>
    //    총 알림 갯수 ={total} :, 남은알림갯수 :{" "}
    //    {total - this.props.allData["완료된 알림"].length}
    //  </div>
    //
    return (
      <div>
        <div>
          {this.props.selectGroupTitle === "완료된 알림" ? (
            <div>
              총 알림 갯수 ={total} :, 남은알림갯수 :{" "}
              {total - this.props.allData["완료된 알림"].length}
            </div>
          ) : (
            undefined
          )}
        </div>
        <div>
          {this.props.selectToDoList.map((addTodoList, index) => (
            <div key={addTodoList + index}>
              {this.props.selectGroupTitle === "완료된 알림" ? (
                <li>{addTodoList}</li>
              ) : (
                <div>
                  <input type="radio" value={addTodoList} onChange={this.forCheck.bind(this)} />
                  {addTodoList}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default TodoListEntry
