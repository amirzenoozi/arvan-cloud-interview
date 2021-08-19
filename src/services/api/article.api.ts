import { Observable } from 'rxjs';
import api from 'src/helpers/api';

const getArticles = (queryParams?: any): Observable<any> => {
  return api.get<any>({
    url: 'api/articles',
    shouldAuth: true,
    queryParams,
  }) as Observable<any>;
};

const getArticleTags = (queryParams?: any): Observable<any> => {
  return api.get<any>({
    url: 'api/tags',
    shouldAuth: true,
    queryParams,
  }) as Observable<any>;
};

const createNewArticle = (formFields: any): Observable<any> => {
  return api.post<any>({
    url: 'api/articles',
    shouldAuth: true,
    body: formFields,
  }) as Observable<any>;
};

const updateArticleBySlug = (slug: string, formFields: any): Observable<any> => {
  return api.put<any>({
    url: `api/articles/${slug}`,
    shouldAuth: true,
    body: formFields,
  }) as Observable<any>;
};

const getArticleBySlug = (slug: string): Observable<any> => {
  return api.get<any>({
    url: `api/articles/${slug}`,
    shouldAuth: true,
  }) as Observable<any>;
};

export {
  getArticles,
  getArticleTags,
  createNewArticle,
  updateArticleBySlug,
  getArticleBySlug,
};
