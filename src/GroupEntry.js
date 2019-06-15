import React from "react"

class GroupEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  forDelete(group) {
    this.props.deleteGroup(group.target.className)
  }

  forClear(group) {
    //클릭한 그룹 내의 모든 데이터를 삭제해준다.
    this.props.allData[group.target.className] = []
    this.props.clearCompleteData(this.props.allData)
  }

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
            {group === "완료된 알림" ? (
              this.props.allData[group].length ? (
                <button className={group} onClick={this.forClear.bind(this)}>
                  All
                </button>
              ) : (
                undefined
              )
            ) : (
              //깔끔한 종료버튼 이미지 삽입할것
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
