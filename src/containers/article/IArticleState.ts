import { Article } from "../../model/Article";


export interface IArticleStateContainer{
    articles: Article[];
    category:string;
}