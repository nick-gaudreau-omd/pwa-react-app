import { Article } from "../../model/Article";


export interface NewsContainerState{
    articles: Article[];
    category:string;
}