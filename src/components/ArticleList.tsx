import * as React from 'react';
import { IArticleListProps } from './IArticleListProps';
import ArticleCard from './ArticleCard';
import { Article } from '../model/Article';
import Util from '../Util';

export default class ArticleList extends React.Component<IArticleListProps, {}>{

    constructor(props: IArticleListProps) {
        super(props);
    }

    render() {
        
        let chunkedArraysOfColSize = Util.chunkArray(this.props.articles, 3);

        return (
            <div className="row">
                {
                    chunkedArraysOfColSize.map( (colSizeArray:Article[], index:number) =>
                        <div className="col-sm-4" key={index.toString()}>
                            {colSizeArray.map((article: Article, i: number) =>
                                <ArticleCard key={article.url} article={article} />
                            )}
                        </div>
                    )
                }
            </div>
        );
    }
}