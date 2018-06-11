import * as React from 'react';
import { IArticleListProps } from './IArticleListProps';
import { ArticleCard } from './ArticleCard';
import { Article } from '../../model/Article';
import Util from '../../Util';

export const ArticleList: React.SFC<IArticleListProps> = (props) => {
    return (
        <div className="row">
            {
                Util.chunkArray(props.articles, 3).map((colSizeArray: Article[], index: number) =>
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