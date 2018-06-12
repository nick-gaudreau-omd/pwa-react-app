import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from '../../components/nav/Nav';

export default class NavOffline extends React.Component<{}, {}> {
    private navRef:any;

    constructor(props:any){
        super(props);
        this.navRef = React.createRef();
    }

    componentDidMount(){
        caches.open('offline-react-web-app-v1.2')
            .then(c => c.keys())
            .then(keys => {
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
                    
                    refChildren.pop(); // rem survey - keep link visible/clickable

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

    render() {
        return (
            <Nav navElementRef={this.navRef} />
        );
    }
}