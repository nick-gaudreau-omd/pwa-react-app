import * as React from 'react';
import { IBodyProps } from './IBodyProps';

export const MainBody: React.SFC<IBodyProps> = (props) => {
    return (
        <div className="shim-top">
            <h2>{props.title}</h2>
            <div className="form-group row">
                <label className="col-2 col-form-label">Title</label>
                <div className="col-10">
                    <input className="form-control" value={props.input1} name="title" type="text" onChange={props.inputChangeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-2 col-form-label">Body</label>
                <div className="col-10">
                    <input className="form-control" name="body" value={props.input2} type="text" onChange={props.inputChangeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-2 col-form-label"></label>
                <div className="col-10">
                    <button className="btn btn-success float-right" onClick={props.onSubmitHandler}>Send</button>
                </div>
            </div>
        </div>
    );
}
