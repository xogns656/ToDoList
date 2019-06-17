import React from "react"

class GroupEntry extends React.Component {
  //그룹 삭제 버튼을 누르면 원본데이터에 영향을 줘서 한 그룹자체가 사라질수 있도록한다.
  forDelete(group) {
    this.props.deleteGroup(group.target.className)
  }

  //COMPLETE들을 모두 삭제할때 사용하기 위한 메서드
  forClear(group) {
    this.props.allData[group.target.className] = []
    this.props.clearCompleteData(this.props.allData)
  }

  //그룹을 선택했을 때 타이틀 과 목록창을 변화시키는 메서드
  select(event) {
    this.props.selectGroup(event.target.className)
  }

  render() {
    return (
      <div>
        {this.props.groupList.map(group => (
          <div key={group}>
            <span className={group} key={group} onClick={this.select.bind(this)}>
              {group}
            </span>
            {/*미리알림은 항상 존재해야 하므로 삭제하지 못하도록 막는다*/}
            {group === "COMPLETE" ? (
              //완료목록으로 하나라도 들어온다면 삭제버튼이 뜨도록 해준다.
              this.props.allData[group].length ? (
                <button className={group} onClick={this.forClear.bind(this)}>
                  All
                </button>
              ) : (
                //완료목록 내부에 아무것도 없다면 버튼을 띄우지 않는다.
                undefined
              )
            ) : (
              //종료버튼 : 깔끔한 종료버튼 이미지 삽입할것
              <button className={group} onClick={this.forDelete.bind(this)}>
                -
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default GroupEntry
