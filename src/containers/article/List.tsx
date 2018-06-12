import * as React from 'react';
import { Article } from '../../model/Article';
import { NewsApiService } from '../../service/NewsApiService';
import { ArticleList } from '../../components/article/ArticleList';
import { IListState } from './IListState';
import NotificationComponent from '../../components/NotificationComponent';
import { IContainerProps } from '../IContainerProps';
//import { Redirect } from 'react-router';

const category_fallback = "GENERAL";

export default class ArticleListContainer extends React.Component<IContainerProps, IListState> {
  private readonly _newsService: NewsApiService;

  constructor(props: any) {
    super(props);
    this._newsService = new NewsApiService();
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
