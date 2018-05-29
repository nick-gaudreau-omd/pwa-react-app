import * as React from 'react';
import { Article } from '../../model/Article';
import { NewsService } from '../../service/NewsService';
import ArticleList from '../../components/ArticleList';
import { NewsContainerState } from './ContainerState';
import NotificationComponent from '../../components/NotificationComponent';
//import { Redirect } from 'react-router';

export default class NewsContainer extends React.Component<{ match:any}, NewsContainerState> {
  private readonly _newsService: NewsService;

  constructor(props: any) {
    super(props);
    this._newsService = new NewsService();
    this.state = {
      articles: [],
      category: ''
    }
  }

  async componentDidMount() {
    //this.props.touchMoveHandler();

    if(!this.state.category) {
      this.setState({category:this.props.match.params.category}, async () => {
        
        await this._newsService.getByCategory(this.state.category.toLocaleLowerCase()).then((articles) => {
          this.setState({ articles: articles });
        });
      });
    } else {      
      await this._newsService.getByCategory(this.state.category.toLocaleLowerCase()).then((articles) => {
        this.setState({ articles: articles });
      });
    }
  }

  componentWillReceiveProps(newProps:any){
    if(this.state.category != newProps.match.params.category){
      this.setState({category:newProps.match.params.category}, () => {
        this.componentDidMount();
      });
      
    }

  }  

  public render() {  

    return (
      <div className="container">
        <br />
        <h2>
          {this.state.category.toUpperCase()}
          <NotificationComponent />
        </h2>
        <hr />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  //}
  }
}
