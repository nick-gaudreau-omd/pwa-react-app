import * as React from 'react';
import { Article } from '../../model/Article';
import { NewsService } from '../../service/NewsService';
import ArticleList from '../../components/ArticleList';
import { NewsContainerState } from './ContainerState';
import NotificationComponent from '../../components/NotificationComponent';
//import { Redirect } from 'react-router';

const category_fallback = "GENERAL";

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

  componentDidMount() {
    //this.props.touchMoveHandler();
    this.loadArticles();
  }

  async loadArticles() {
    
    if(!this.state.category) {
      this.setState({category:this.props.match.params.category}, async () => {
        
        await this._newsService.getByCategory(this.state.category ? this.state.category.toLocaleLowerCase() : void 0).then((articles) => {
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
        this.loadArticles();
      });
      
    }

  }  

  public render() {  

    return (
      <div className="container">
        <br />
        <h2>
          {this.state.category ? this.state.category.toUpperCase() : category_fallback}
          <NotificationComponent />
        </h2>
        <hr />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  //}
  }
}
