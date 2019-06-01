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

  componentDidUpdate(prevProps){
    this.formRef.current && this.formRef.current.focus();
  }

  componentWillReceiveProps(){
    this.setState({iconCkeckVisible: false})
  }

  static propTypes = {
    value: PropTypes.any,
    type: PropTypes.string,
    onChange: PropTypes.func
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
        {(this.state.iconCkeckVisible && this.props.value) && (
          <div><i className="material-icons md-18 font-weight-bold text-success">check</i></div>
        )}
        {(this.state.iconEditVisible || !this.props.value )&&(
          <div><a href="edit" role="button" className="ml-1 text-secondary" onClick={e => this.handleOnClick(e)}><i className="material-icons md-18">edit</i></a></div>
        )}
      </div>
    );

    const edit = (
      <Form {...this.props} ref={this.formRef} onBlur={this.handleOnBlur}/>
    );

    return (
      this.state.editable ? edit : text
    )
  }
}
