import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/FormControl'

export default class EditField extends Component {
  constructor(props){
    super(props);

    this.formRef = React.createRef();

    this.state = {
      editable: false,
      iconEditVisible: false,
      iconCkeckVisible: false,
      value: this.props.value 
    }
  }
  componentDidUpdate(){
    this.formRef.current && this.formRef.current.focus();
  }

  componentWillReceiveProps(){
    this.setState({iconCkeckVisible: false})
  }

  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
  }

  handleOnMouseOver = () =>{
    this.setState({iconEditVisible:true})
  }

  handleOnMouseLeave = () => {
    this.setState({iconEditVisible:false})
  }

  handleOnClick(event){
    event.preventDefault();
    this.setState({editable:true});
  }

  handleOnBlur = () => {
    this.formRef.current.checkValidity() && this.setState({
      editable: false,
      iconEditVisible: false,
      iconCkeckVisible: true
    })
  }

  render() {
    const text = (
      <div className="my-2 ml-3 d-flex" onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>
        <div>{this.props.value}</div>
        <div>{(this.state.iconEditVisible || !this.props.value )&&(
          <a href="" role="button" className="ml-1 text-secondary" onClick={e => this.handleOnClick(e)}><i className="material-icons md-18">edit</i></a>
        )}</div>
        {(this.state.iconCkeckVisible && this.props.value) && (
          <div className="ml-auto"><i className="material-icons md-18 font-weight-bold text-success">check</i></div>
        )}
      </div>
    );

    const edit = (
      <Form {...this.props} ref={this.formRef} onBlur={this.handleOnBlur}/>
    );

    return (
      this.state.editable ? edit: text
    )
  }
}
