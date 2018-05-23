import { Article } from "./Article";

export interface NewsWrapper{
    status:string,
    totalResults:number,
    articles:Article[]
}