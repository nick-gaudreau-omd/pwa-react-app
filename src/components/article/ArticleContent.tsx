import * as React from 'react';
import { IArticleProps } from './IArticleProps';
import { NavLink } from 'react-router-dom';

// const formatDate = (dateString: string) => new Date(dateString).toDateString();

export const ArticleContent: React.SFC<IArticleProps> = (props) => {

  let published = new Date(props.article.publishedAt);
  let timeAgo: number = 0;
  if (published)
    timeAgo = published.getMinutes();

  let inflatedDescription = [];
  for (let index = 0; index < 15; index++) {
    inflatedDescription.push(props.article.description + " ");
  }
    
  return (
    <div className="container">
        <br />
        <h2>
          {props.article.title}
        </h2>
        <hr />
        <div className="row">
          <div className="col-sm-10 offset-md-1">
            <div className="card shim-bottom">
              <img className="card-img-top" src={props.article.urlToImage} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">
                  Source: {props.article.source.name} : <a href={props.article.url} target="_blank">link</a>
                </h5>
                <h5 className="card-title">
                  {props.article.author ? 'Author: ' + props.article.author : ''}
                </h5>
                <p className="card-text">
                  {inflatedDescription}
                </p>          
                <p className="card-text">
                  <small className="text-muted">{timeAgo > 0 ? timeAgo + ' min ago' : props.article.publishedAt}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

}