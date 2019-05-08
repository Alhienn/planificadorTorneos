import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  Form from 'react-bootstrap/FormControl'

export default class EditField extends Component {
  constructor(props){
    super(props);

    this.formRef = React.createRef();

    this.state = {
      editable: false,
      iconVisible: false,
      value: this.props.value 
    }
  }
  componentDidUpdate(){
    this.formRef.current && this.formRef.current.focus();
  }

  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
  }

  handleOnMouseOver = () =>{
    this.setState({iconVisible:true})
  }

  handleOnMouseLeave = () => {
    this.setState({iconVisible:false})
  }

  handleOnClick(event){
    event.preventDefault();
    this.setState({editable:true});
  }

  handleOnBlur = () => {
    this.setState({editable:false, iconVisible:false})
  }

  render() {
    const text = (
      <div className="m-3" onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>{this.props.value}{this.state.iconVisible && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="" role="button" className="ml-1 text-secondary" onClick={e => this.handleOnClick(e)}><i className="material-icons md-18">edit</i></a>
      )}</div>
    );

    const edit = (
      <Form {...this.props} ref={this.formRef} onBlur={this.handleOnBlur}/>
    );

    return (
      this.state.editable ? edit: text
    )
  }
}
