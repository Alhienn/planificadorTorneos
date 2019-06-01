import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { Form } from 'react-bootstrap'

import { returnErrors, clearErrors } from '../../store/actions/errors';

class MarcadorEditField extends Component {
  constructor(props){
    super(props);

    this.formRef = React.createRef();
    const {value} = this.props

    this.state = {
      editable: false,
      iconEditVisible: false,
      value: value,
      validated: false
    }
  }
  
  static propTypes = {
    local: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    returnErrors: PropTypes.func.isRequired, 
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(){
    this.formRef.current && this.formRef.current.focus();
  }

  handleOnChange(event) {
    this.setState(
      {
        value : event.target.value,
      }
    )
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

  handleOnSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.handleOnBlur()
  }

  handleOnBlur = () => {
    if(this.formRef.current.checkValidity()){
      this.setState({
        editable: false,
        iconEditVisible: false
      })
      let body
      if(this.props.local){
        if(this.state.value === ""){
          body = {
            marcador_local: null
          }
        }else{
          body = {
            marcador_local: this.state.value
          }
        }
      }else{
        if(this.state.value === ""){
          body = {
            marcador_visitante: null
          }
        }else{
          body = {
            marcador_visitante: this.state.value
          }
        }
      }
      let config = {
        headers: {
          'Authorization': `Token ${this.props.token}`
        }
      };
      axios.patch(`http://127.0.0.1:8000/api/partido/${this.props.id}`, body, config)
        .then(this.props.clearErrors)
        .catch(err => this.props.returnErrors(err))
    }
  }

  render() {
    const text = (
      <div className="my-2 ml-3 d-flex" onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>
        <div>{this.state.value}</div>
        {(this.state.iconEditVisible || !this.state.value )&&(
          <div><a href="edit" role="button" className="ml-1 text-secondary" onClick={e => this.handleOnClick(e)}><i className="material-icons md-18">edit</i></a></div>
        )}
      </div>
    );

    const edit = (
      <Form 
        validated
        onSubmit={e => this.handleOnSubmit(e)}
      >
        <Form.Control 
          type="number"
          min="0"
          step="1"
          value={this.state.value}
          ref={this.formRef}
          onBlur={this.handleOnBlur}
          onChange={e => this.handleOnChange(e)}
        />
        <Form.Control.Feedback type="invalid">
          Introduce un número valido.
        </Form.Control.Feedback>
      </Form>
    );

    return (
      this.state.editable ? edit : text
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

export default connect(mapStateToProps, { returnErrors, clearErrors})(MarcadorEditField);
