import React from "react"
//한글검색을 위한 자모분리 라이브러리 다운로드
const Hangul = require("hangul-js")
//유니코드를 이용해서 분리했다고 함.

class Search extends React.Component {
  forSearch(event) {
    let arr = Object.values(this.props.allData)
      .slice(1)
      .join()
      .split(",")
      .filter(input => Hangul.search(input, event.target.value) === 0)

    this.props.searchData(arr, event.target.value)
  }

  render() {
    return (
      <span>
        <input className="searchBar" onChange={this.forSearch.bind(this)} />
      </span>
    )
  }
}
export default Search
