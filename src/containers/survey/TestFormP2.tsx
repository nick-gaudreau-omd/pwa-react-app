import * as React from 'react';
import { LocalStoreService } from '../../service/LocalStoreService';
import { IFormProps } from './IFormProps';

export default class TestFormP2 extends React.Component<IFormProps, {
  like:string,
  hate:string,
  toAdd:string
}> {


  constructor(props: IFormProps) {
    super(props);
    this.state = {
      like: '',
      hate: '',
      toAdd: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    let l =  await this.props.localforageService.getData("like");
    let h =  await this.props.localforageService.getData("hate");
    let t =  await this.props.localforageService.getData("toAdd");
    
    this.setState({
      like: l,
      hate: h,
      toAdd: t
    });
  }

  handleChange(e:any) {
    
    this.props.onChangeRef(e);
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  public render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (

      <div className="shim-top">
        <h2>...About the site</h2>
        <div className="form-group row">
          <label className="col-5 col-form-label">What you LIKE the most?</label>
          <div className="col-7">
            <input className="form-control" name="like" value={this.state.like} type="text" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-5 col-form-label">What you HATE the most?</label>
          <div className="col-7">
            <input className="form-control" name="hate" type="text" value={this.state.hate} onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-5 col-form-label">Anything you'd like us to add?</label>
          <div className="col-7">
            <input className="form-control" type="text" name="toAdd" value={this.state.toAdd} onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
