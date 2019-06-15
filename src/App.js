import React from "react"
import Group from "./Group"
import ListTitle from "./ListTitle"
import Search from "./Search"
import TodoList from "./TodoList"

//주의사항:
//랜더링 메소드 내부에 삼항연산자를 써서 컴포넌트를 조작하려할때, 항상 <div>혹은 무엇인가로 감싸줘야한다!!

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //미리알림은 미리 생성된 그룹목록이다.
      allData: { "완료된 알림": [12, 3, 4] },
      //검색한 데이터들만 따로 담기위한 배열이다.
      searchData: [],
      selectGroupTitle: "타이틀프로토타입"
    }
  }
  //완료된 알림에 들어있는 모든 배열의 내용을 삭제 해 준다.
  clearCompleteData(UpdateAllData) {
    this.setState({
      allData: UpdateAllData
    })
  }

  //입력받은데이터를 현재 속한 그룹의 배열에 넣고 출력해준다.
  outputData(UpdateAllData) {
    this.setState({
      allData: UpdateAllData
    })
  }

  addGroup(group) {
    if (group.length) {
      //새로운그룹을 생성해주고, 데이터의 목록을 추가할 배열을 같이 할당해준다.
      this.setState((this.state.allData[group] = []))
    }
  }

  //클릭한 그룹명을 받아오면 모든데이터중 해당 그룹명에 해당하는 그룹만 삭제해준다.
  deleteGroup(group) {
    delete this.state.allData[group]
    this.setState({
      allData: this.state.allData
    })
  }

  selectGroup(group) {
    this.setState({
      selectGroupTitle: group
    })
  }

  render() {
    return (
      <div className="body">
        <div className="left-side-group">
          <div>
            {/*검색어 입력*/}
            <Search />
          </div>
          <div>
            {/*그룹생성 및 생성된 그룹리스트를 보여주기 위함*/}
            <Group
              allData={this.state.allData}
              //input값을 입력받아 그룹을 추가하기 위함. 싱크문제 발생하므로 APP내에서 input박스를 만드는 것 고려해볼것.
              addGroup={this.addGroup.bind(this)}
              //생성된 그룹리스트를 위해 그룹리스트의 목록이 담긴 배열을 프로퍼티로 넘겨준다.
              groupList={Object.keys(this.state.allData)}
              //그룹의 삭제를 처리하기 위해 이 함수를 내려보냄
              deleteGroup={this.deleteGroup.bind(this)}
              //해당그룹에 대한 데이터를 가져오기 위해 가장 먼저 할 것은 그룹목록에서 원하는 것을 선택(Onclick)하는 것이다.
              //따라서 그룹목록을 선택하기 위해 작성한 아래의 함수를 prop으로 내려준다.
              selectGroup={this.selectGroup.bind(this)}
              //완료목록의 삭제를 위해 내려준다.
              clearCompleteData={this.clearCompleteData.bind(this)}
            />
          </div>
        </div>
        <div className="right-side-group">
          <div className="ListTitle">
            {/*클릭한 그룹명이 타이틀로 이동*/}
            <ListTitle changeTitle={this.state.selectGroupTitle} />
          </div>
          <div className="TodoList">
            {/*클릭한 그룹내의 데이터가 이곳으로 이동*/}
            {/*Title이 "초기값"일 때는 TodoList는 알림추가로서의 기능을 사용하지 못하게 막고 전체 알림의 갯수 대비 남은 알림의 갯수를 출력하는 기능을 하도록 구현한다.*/}
            {/*Title이 allData내부에 키값이 있으면, input기능을 열어주고, allData내부에 없다면 input기능을 닫아준다.*/}
            <TodoList
              selectGroupTitle={this.state.selectGroupTitle}
              allData={this.state.allData}
              outputData={this.outputData.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
