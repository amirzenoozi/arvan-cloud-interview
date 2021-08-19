import { Observable } from 'rxjs';
import api from 'src/helpers/api';

const getArticles = (queryParams?: any): Observable<any> => {
  return api.get<any>({
    url: 'api/articles',
    shouldAuth: true,
    queryParams,
  }) as Observable<any>;
};

export {
  getArticles,
};
