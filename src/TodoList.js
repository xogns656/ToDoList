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
      //엔터를 쳤을때 input내부의 값을 리셋해준다.
      event.target.value = ""
    }
  }

  render() {
    return (
      <div>
        {/*만약 서칭된 데이터가 없다면*/}
        {!this.props.searchData.length ? (
          //해당 그룹이 원본 데이터 내부에 존재하는지 확인한 뒤, 존재하는 데이터라면 TodolistEntry에 데이터들을 넘겨주고
          this.props.allData.hasOwnProperty(this.props.selectGroupTitle) ? (
            <div>
              {/*완료목록의 구현을 위해 타이틀을 넘겨준다.*/}
              <TodoListEntry
                allData={this.props.allData}
                searchData={this.props.searchData}
                selectGroupTitle={this.props.selectGroupTitle}
                selectToDoList={this.props.allData[this.props.selectGroupTitle]}
                completeData={this.props.completeData}
                outputData={this.props.outputData}
              />
              {/*선택된 그룹이 완료된 결과를 모아놓은 그룹이라면 리스트를 작성할 수 없게 만들고 일반그룹이라면 데이터를 작성할수 있도록 input을 만든다.*/}
              {this.props.selectGroupTitle !== "COMPLETE" ? (
                <input
                  className="inputToDo"
                  placeholder="+ 일정을 추가하세요"
                  onKeyDown={this.inputData.bind(this)}
                />
              ) : (
                undefined
              )}
            </div>
          ) : (
            undefined
          )
        ) : (
          //만약 서칭된 데이터가 있다면, searchData를 Entry로 내려준다.
          <div>
            <TodoListEntry
              searchData={this.props.searchData}
              searchDataClear={this.props.searchDataClear}
              allData={this.props.allData}
              completeData={this.props.completeData}
              outputData={this.props.outputData}
            />
          </div>
        )}
      </div>
    )
  }
}
export default TodoList
