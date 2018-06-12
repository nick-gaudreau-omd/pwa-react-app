import * as React from 'react';
import { LocalStoreService } from '../../service/LocalStoreService';
import { IFormProps } from './IFormProps';

export default class TestFormP1 extends React.Component<IFormProps, {
  category:string,
  search:string,
  newsSite:string
 }> {

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      category: '',
      newsSite: '',
      search: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    let c =  await this.props.localforageService.getData("category");
    let n =  await this.props.localforageService.getData("newsSite");
    let s =  await this.props.localforageService.getData("search");
    
    this.setState({
      category: c,
      newsSite: n,
      search: s
    });
  }

  handleChange(e:any) {
    if(!e) return;
    this.props.onChangeRef(e);
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  public render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <div className="shim-top">
        <h2>Survey start...</h2>
        <div className="form-group row">
          <label className="col-2 col-form-label">Favourite category?</label>
          <div className="col-10">
            <input className="form-control" value={this.state.category} name="category" type="text" onChange={this.handleChange}  />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Favourite search?</label>
          <div className="col-10">
            <input className="form-control" name="search" value={this.state.search}  type="text" onChange={this.handleChange}  />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Favourite news site?</label>
          <div className="col-10">
            <input className="form-control" type="text" value={this.state.newsSite} name="newsSite" onChange={this.handleChange}  />
          </div>
        </div>
      </div>
    );
  }
}
