import React from "react"
const completeDate = require("moment")

class TodoListEntry extends React.Component {
  returnData(event) {
    //클릭한 곳의 클래스 네임은 데이터 + 그룹의 형식으로 나올것이고
    let className = event.target.className.split(" ")
    //배열로 만들어 데이터와 그룹을 따로 분리해준다.
    let data = className[0]
    let group = className[1]
    //원본데이터중에서 원래 있던 곳으로 돌려 놓은 뒤
    this.props.allData[group].push(data)
    //업데이트한 데이터를 COMPLETE 리스트에서 지워준다.
    this.props.allData["COMPLETE"].splice(
      this.props.allData["COMPLETE"].indexOf(event.target.value),
      1
    )
    //업데이트한 결과를 다시 랜더링해준다.
    this.props.outputData(this.props.allData)
  }

  forCheck(event) {
    //라디오버튼에 체크가되면 'COMPLETE'목록으로 이동시킨다.
    let originalData = event.target.value
    //1. 만약 클릭된 버튼이 서칭결과에 있는 것이라면
    if (!this.props.selectGroupTitle) {
      let splitData = event.target.value.split(" ( ")
      event.target.value = splitData[0]
      let selectGroupTitle = splitData[1].split(" ")[0]

      this.props.allData["COMPLETE"].push(
        completeDate().format("YY. M. D, h:mm a") +
          " : " +
          event.target.value +
          " ( " +
          selectGroupTitle +
          " 에서 삭제됨" +
          " ) "
      )
      //서칭결과에서 지운 리스트가 원본에도 영향을 미칠수 있도록 업데이트 해준다.
      this.props.allData[selectGroupTitle].splice(
        this.props.allData[selectGroupTitle].indexOf(event.target.value),
        1
      )
      //또한 서칭이 여러개가 있을경우를 가정하여 searchData도 지워준 요소에 해당되는 항목을 삭제한
      //업데이트 된 배열을 만들어준다.
      this.props.searchData.splice(this.props.searchData.indexOf(originalData), 1)
    }

    //2. 만약 일반그룹내의 데이터를 삭제했다면
    else if (event.target.value && this.props.selectGroupTitle) {
      this.props.allData["COMPLETE"].push(
        completeDate().format("YY. M. D, h:mm a") +
          " : " +
          event.target.value +
          " ( " +
          this.props.selectGroupTitle +
          " 에서 삭제됨" +
          " ) "
      )
      //삭제한 인자가 원본에도 영향을 줄 수 있도록 업데이트 한다.
      this.props.allData[this.props.selectGroupTitle].splice(
        this.props.allData[this.props.selectGroupTitle].indexOf(event.target.value),
        1
      )
    }

    //3. 업데이트가 완료된 데이터들을 APP으로 보내준다.
    this.props.completeData(this.props.allData, this.props.searchData)
  }

  render() {
    //총 개수 표현 하기 위함.
    let total = 0

    if (!this.props.searchData.length) {
      //reduce가 빈 배열일 경우에 먹히지 않아서 다음과 같은 방법 이용함.
      //될것같은데.. 다시 리팩토링할때 사용해보겠음
      for (let i = 0; i < Object.values(this.props.allData).length; i++) {
        total += Object.values(this.props.allData)[i].length
      }
    }
    return (
      //만약 서칭된 데이터가 없을때
      <div>
        {!this.props.searchData.length ? (
          <div>
            <div>
              {//COMPLETE을 출력하는 그룹의 Entry라면 아래의 메시지를 상단에 고정시켜주고
              this.props.selectGroupTitle === "COMPLETE" ? (
                <div>{total - this.props.allData["COMPLETE"].length} 개의 일정이 남아있어요</div>
              ) : (
                //일반 그룹이라면 상단에 아무것도 뜨지 않도록 만들어준다.
                undefined
              )}
            </div>
            <div>
              {//만약 그룹이 COMPLETE이라면
              this.props.selectToDoList.map((addTodoList, index) => (
                <div key={addTodoList + index}>
                  {this.props.selectGroupTitle === "COMPLETE" ? (
                    //라디오 버튼의 형식으로 넣어주고, 클릭했을 때, 데이터가 다시 업데이트 될수 있도록 한다.
                    <div>
                      <input
                        type="radio"
                        onChange={this.returnData.bind(this)}
                        className={
                          //하드코딩으로 데이터와 클래스를 구분지었음.. 더 좋은 방법 생각해볼것!
                          addTodoList.split(" ( ")[0].split(" : ")[1] +
                          " " +
                          addTodoList.split(" ( ")[1].split(" ")[0]
                        }
                        value={addTodoList}
                      />
                      {addTodoList}
                    </div>
                  ) : (
                    <div>
                      {/*자신이 추가된 그룹을 className으로 지정해서 구분지어준다.*/}
                      <input type="radio" value={addTodoList} onChange={this.forCheck.bind(this)} />
                      {addTodoList}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          //만약 서칭된 데이터가 있다면, 라디오 버튼을 가지고 출력시켜준다.
          //라디오 버튼을 눌렀을 때, 원본데이터와 완료목록에 변화를 줄수 있도록 한다.
          <div>
            {this.props.searchData.map((acc, index) => (
              <div key={acc + index}>
                <input
                  type="radio"
                  className={
                    //하드코딩으로 데이터와 클래스를 구분지었음.. 더 좋은 방법 생각해볼것!
                    acc.split(" ( ")[0].split(" : ")[1] + " " + acc.split(" ( ")[1].split(" ")[0]
                  }
                  value={acc}
                  onChange={this.forCheck.bind(this)}
                />

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
