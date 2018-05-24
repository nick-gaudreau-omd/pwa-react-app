import * as React from 'react';
import { Article } from '../../model/Article';

export default class NewsContent extends React.Component<{ match: any }, { article: Article }>{
  
  constructor(props: any) {
    super(props);
    this.state = {
      article: {
        author: '',
        description: '',
        publishedAt: new Date().toDateString(),
        source: {
          name: ''
        },
        title: '',
        url: '',
        urlToImage: ''
      }
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.value);
    let art = JSON.parse(decodeURIComponent(this.props.match.params.value));
    this.setState({ article: art });
  }

  render() {

    let published = new Date(this.state.article.publishedAt);
    let timeAgo: number = 0;
    if (published)
      timeAgo = published.getMinutes();

    let inflatedDescription = [];
    for (let index = 0; index < 15; index++) {
      inflatedDescription.push(this.state.article.description + " ");
    }

    return (
      <div className="container">
        <br />
        <h2>
          {this.state.article.title}
        </h2>
        <hr />
        <div className="row">
          <div className="col-sm-10 offset-md-1">
            <div className="card shim-bottom">
              <img className="card-img-top" src={this.state.article.urlToImage} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">
                  Source: {this.state.article.source.name} : <a href={this.state.article.url} target="_blank">link</a>
                </h5>
                <h5 className="card-title">
                  {this.state.article.author ? 'Author: ' + this.state.article.author : ''}
                </h5>
                <p className="card-text">
                  {inflatedDescription}
                </p>          
                <p className="card-text">
                  <small className="text-muted">{timeAgo > 0 ? timeAgo + ' min ago' : this.state.article.publishedAt}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}