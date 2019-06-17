import React from "react"
//한글검색을 위한 자모분리 라이브러리 다운로드
const Hangul = require("hangul-js")
//유니코드를 이용해서 분리했다고 함.

class Search extends React.Component {
  forSearch(event) {
    let filterObj = {}
    let allDataKeys = Object.keys(this.props.allData)

    //1. 검색어가 담긴 객체를 생성하기
    //완료된 목록은 포함하지 않는 모든 그룹의 목록을 만들어주고
    for (let i = 1; i < allDataKeys.length; i++) {
      filterObj[allDataKeys[i]] = []
    }
    //원본 데이터에 검색어에 해당하는 단어가 있다면, 위에서 만들어준 객체내부에서 동일한 그룹명을 찾아
    //그 안에 검색된 데이터를 넣어준다.
    for (let i = 1; i < allDataKeys.length; i++) {
      for (let value of this.props.allData[allDataKeys[i]]) {
        if (Hangul.search(value, event.target.value) === 0) {
          filterObj[allDataKeys[i]].push(value)
        }
      }
    }

    //검색했을때 가독성을 좋게 하기 위해 다음과 같이 변경한 뒤, 리스트에 출력되도록한다.
    let classifiedByClassName = []
    for (let keys in filterObj) {
      if (filterObj[keys].length) {
        for (let value of filterObj[keys]) {
          classifiedByClassName.push(value + " ( " + keys + " )")
        }
      }
    }
    this.props.searchData(classifiedByClassName, event.target.value)
  }

  //엔터키를 쳤을때 검색창과 검색했던 데이터들을 초기화 시키고 초기화면으로 넘어간다.
  forClear(event) {
    if (event.keyCode === 13) {
      //데이터 초기화
      this.props.searchDataClear([])
      //검색창 초기화
      event.target.value = ""
    }
  }

  //검색어 입력 시 리셋되는 거 해결할 것 (onSubmit 제어 방법)
  render() {
    return (
      <div>
        <input
          className="searchBar"
          placeholder="검색어를 입력하세요"
          onChange={this.forSearch.bind(this)}
          onKeyDown={this.forClear.bind(this)}
        />
      </div>
    )
  }
}
export default Search
