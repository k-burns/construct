import React from 'react'
import {connect} from 'react-redux'

const defaultState = {
  ducks: []
}

export class Nest extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   console.log('help')
  //   let project = this.props.ducks || defaultState
  //   this.setState({
  //     ducks: project
  //   })
  //   console.log(this.state)
  // }

  render() {
    // let {ducks} = this.state
    // console.log(ducks)
    // console.log(this.props)
    return (
      <div className="project">
      </div>
    )
  }
}

const mapState = state => ({
  ducks : state.ducks
})

export default connect(mapState)(Nest)
