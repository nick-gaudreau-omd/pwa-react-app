import axios from 'axios';
import { NewsWrapper } from '../model/NewsWrapper';
import { Article } from '../model/Article';

export class NewsApiService {
    private endpoint:string = "https://newsapi.org/v2/top-headlines?language=en&country=ca&apiKey=9933f02648834737bc4dd4f7c48cba94&sortBy=publishedAt&category=";  
    dataKey: string = "news";

    getByCategory(category = "general"): Promise<Article[]>{
        return axios.get(this.endpoint + category).then((response) => {
            let newsWrapper = <NewsWrapper>response.data;
            return newsWrapper.articles.filter(x => x.urlToImage && x.urlToImage.indexOf('https') > -1);
        });
    }
}