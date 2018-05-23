import * as React from 'react';
import { LocalStoreService } from '../../service/LocalStoreService';
import { IFormProps } from './IFormProps';

export default class TestFormP3 extends React.Component<IFormProps, {
  firstName:string,
  lastName:string,
  email:string
}> {


  constructor(props: IFormProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      firstName: LocalStoreService.getSessionData("firstName"),
      lastName: LocalStoreService.getSessionData("lastName"),
      email: LocalStoreService.getSessionData("email")
    })
  }

  handleChange(e:any) {
    
    this.props.onChangeRef(e);
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  public render() {
    if (this.props.currentStep !== 3) {
      return null;
    }
    return (

      <div className="shim-top">
        <h2>...Finally!</h2>
        <div className="form-group row">
          <label className="col-2 col-form-label">First name</label>
          <div className="col-10">
            <input className="form-control" value={this.state.firstName} name="firstName" type="text" onChange={this.handleChange}  />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Last name</label>
          <div className="col-10">
            <input className="form-control" name="lastName" value={this.state.lastName}  type="text" onChange={this.handleChange}  />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Email</label>
          <div className="col-10">
            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange}  />
          </div>
        </div>
      </div>
    );
  }
}
