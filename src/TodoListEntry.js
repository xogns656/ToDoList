import React from "react"
const completeDate = require("moment")

class TodoListEntry extends React.Component {
  forCheck(event) {
    //라디오버튼에 체크가되면 '완료된 알림'목록으로 이동시킨다.
    if (event.target.value) {
      this.props.allData["완료된 알림"].push(
        event.target.value +
          "\t\t" +
          completeDate().format("YY. M. D, h:mm a") +
          this.props.selectGroupTitle +
          "으로부터 삭제됨."
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
    let total = 0
    if (!this.props.searchData.length) {
      //총 개수 표현 하기 위함.
      //reduce가 빈 배열일 경우에 먹히지 않아서 다음과 같은 방법 이용함.
      //될것같은데.. 다시 리팩토링할때 사용해보겠음
      for (let i = 0; i < Object.values(this.props.allData).length; i++) {
        total += Object.values(this.props.allData)[i].length
      }
    }
    console.log(this.props.allData)
    return (
      //만약 서칭된 데이터가 없을때
      <div>
        {!this.props.searchData.length ? (
          <div>
            <div>
              {//완료된 알림을 출력하는 그룹의 Entry라면 아래의 메시지를 상단에 고정시켜주고
              this.props.selectGroupTitle === "완료된 알림" ? (
                <div>
                  총 알림 갯수 ={total} :, 남은알림갯수 :{" "}
                  {total - this.props.allData["완료된 알림"].length}
                </div>
              ) : (
                //일반 그룹이라면 상단에 아무것도 뜨지 않도록 만들어준다.
                undefined
              )}
            </div>
            <div>
              {//만약 그룹이 완료된 알림이라면
              this.props.selectToDoList.map((addTodoList, index) => (
                <div key={addTodoList + index}>
                  {this.props.selectGroupTitle === "완료된 알림" ? (
                    //리스트 형식으로 넣어주고
                    <li>{addTodoList}</li>
                  ) : (
                    <div>
                      {/*자신이 추가된 그룹을 className으로 지정해서 구분지어준다.*/}
                      <input
                        type="radio"
                        className={this.props.selectGroupTitle}
                        value={addTodoList}
                        onChange={this.forCheck.bind(this)}
                      />
                      {addTodoList}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {this.props.searchData.map((acc, index) => (
              <div key={acc + index}>
                <input type="radio" />
                {acc}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default TodoListEntry
