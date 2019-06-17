import React from "react"
//한글검색을 위한 자모분리 라이브러리 다운로드
const Hangul = require("hangul-js")
//유니코드를 이용해서 분리했다고 함.

class Search extends React.Component {
  forSearch(event) {
    let filterObj = {}
    let allDataKeys = Object.keys(this.props.allData)
    for (let i = 1; i < allDataKeys.length; i++) {
      filterObj[allDataKeys[i]] = []
    }
    for (let i = 1; i < allDataKeys.length; i++) {
      for (let value of this.props.allData[allDataKeys[i]]) {
        if (Hangul.search(value, event.target.value) === 0) {
          filterObj[allDataKeys[i]].push(value)
        }
      }
    }
    //주어진 className으로 구분할것
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
      this.props.searchDataClear()
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
          onChange={this.forSearch.bind(this)}
          onKeyDown={this.forClear.bind(this)}
        />
      </div>
    )
  }
}
export default Search
