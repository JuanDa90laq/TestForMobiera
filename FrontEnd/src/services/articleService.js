import { ApiService } from './apiService';

export const ArticleService = {
  GetArticles() {
    return ApiService.get(`/articles`);
  },
}

