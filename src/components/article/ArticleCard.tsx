import * as React from 'react';
import { IArticleProps } from './IArticleProps';
import { NavLink } from 'react-router-dom';

// const formatDate = (dateString: string) => new Date(dateString).toDateString();

export const ArticleCard: React.SFC<IArticleProps> = (props) => {

  let published = new Date(props.article.publishedAt);
  let timeAgo: number = 0;
  if (published)
    timeAgo = published.getMinutes();
    
  return (
    <div className="card shim-bottom">
      <img className="card-img-top" src={props.article.urlToImage} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">
          <NavLink to={'/content/' + encodeURIComponent(JSON.stringify(props.article))}>{props.article.title}</NavLink>
        </h5>
        <p className="card-text">{props.article.description}</p>
        <p className="card-text">
          <small className="text-muted">{timeAgo > 0 ? timeAgo + ' min ago' : props.article.publishedAt}</small>
        </p>
      </div>
    </div>
  );

}