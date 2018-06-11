import * as React from 'react';
import { Article } from '../../model/Article';
import { ArticleContent } from '../../components/article/ArticleContent';
import { IContainerProps } from '../IContainerProps';

export default class ArticleContentContainer extends React.Component<IContainerProps, { article: Article }>{
  
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

    return (
      <ArticleContent article={this.state.article} />
    );
  }
}