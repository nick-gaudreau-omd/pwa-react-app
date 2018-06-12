import { Article } from "../../model/Article";


export interface IListState{
    articles: Article[];
    category:string;
}