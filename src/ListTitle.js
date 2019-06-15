import React from "react"

class ListTitle extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>{this.props.changeTitle}</div>
  }
}
export default ListTitle
