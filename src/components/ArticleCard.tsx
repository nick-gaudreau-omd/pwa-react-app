import * as React from 'react';
import { IArticleProps } from './IArticleProps';

// const formatDate = (dateString: string) => new Date(dateString).toDateString();

export default class ArticleCard extends React.Component<IArticleProps, {}>{

  constructor(props: IArticleProps) {
    super(props);
  }

  render() {

    let published = new Date(this.props.article.publishedAt);
    let timeAgo:number = 0;
    if(published)
      timeAgo = published.getMinutes();
    
    return (
      <div className="card shim-bottom">
        <img className="card-img-top" src={this.props.article.urlToImage} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{this.props.article.title}</h5>
          <p className="card-text">{this.props.article.description}</p>
          <p className="card-text">
            <small className="text-muted">{ timeAgo > 0 ? timeAgo + ' min ago' : this.props.article.publishedAt}</small>
          </p>
        </div>
      </div>
    );
  }
}