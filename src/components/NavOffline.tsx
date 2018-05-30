import * as React from 'react';
import { NavLink } from 'react-router-dom';

class NavOffline extends React.Component<{}, {}> {

    private navRef:any;

    constructor(props:any){
        super(props);
        this.navRef = React.createRef();
    }

    componentDidMount(){
        caches.open('offline-react-web-app-v1.2')
            .then(c => c.keys())
            .then(keys => {
                console.log(keys);

                let cachedApiRequestKeys = keys.filter(x => x.url.indexOf("category=") > -1);

                let categories:string[] = [];
                cachedApiRequestKeys.forEach( (cachedReqKey) => {
                    let categoryArr = cachedReqKey.url.split("category=");
                    if(categoryArr){
                        let category = categoryArr[1];
                        categories.push(category);
                    }
                });

                if(this.navRef){

                    let refChildren:any[] = Array.from(this.navRef.current.children);

                    // rem survey - keep link alive
                    refChildren.pop();

                    if(refChildren) {                        
                        refChildren.forEach((liElement) => {

                            if (categories.some((cat) => { return liElement.firstChild.href.indexOf(cat) > -1; })) {
                                // keep link alive
                            }
                            else {
                                // disable link
                                let anchor = liElement.firstChild;
                                anchor.addEventListener('click',(e:any) => {
                                    e.preventDefault();
                                });
                                anchor.classList.add("disable-link");
                            }
                            
                        });
                        
                    }
                }

                
            } );
    }

    prevent(event:any){
        event.preventDefault();
    }

    render() {
        return (
            <ul className="nav nav-tabs"  ref={this.navRef}>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/general'>General</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/business'>Business</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/technology'>Tech</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/sports'>Sport</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/entertainment'>Entertainment</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/science'>Science</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/news/health'>Health</NavLink>
                </li>
                <li role="presentation" className="nav-item">
                    <NavLink className="nav-link" to='/survey'>Survey</NavLink>
                </li>
            </ul>
        );
    }
}

export default NavOffline;