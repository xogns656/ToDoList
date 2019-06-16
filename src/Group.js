import React from "react"
import GroupEntry from "./GroupEntry"

//할일목록
//그룹추가 후 추가창 초기화시키기

class Group extends React.Component {
  //입력한 값을 그룹받아서
  inputGroup(event) {
    //빈칸이 아닌상태에서 엔터를 입력했을 때
    if (event.keyCode === 13 && event.target.value.length) {
      //그룹목록에 추가해준다.
      this.props.allData[event.target.value] = []
      this.props.addGroup(this.props.allData)
    }
  }

  render() {
    return (
      <div>
        <div>
          <GroupEntry
            allData={this.props.allData}
            groupList={this.props.groupList}
            deleteGroup={this.props.deleteGroup.bind(this)}
            selectGroup={this.props.selectGroup}
            clearCompleteData={this.props.clearCompleteData}
          />
        </div>
        <input onKeyDown={this.inputGroup.bind(this)} />
      </div>
    )
  }
}

export default Group
