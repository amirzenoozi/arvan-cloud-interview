import { delay, map, mergeMap, retryWhen, take } from 'rxjs/operators';
import { defer, Observable, throwError, timer } from 'rxjs';
import { IApiGetProps, IApiPostProps, IApiDeleteProps } from './api.interface';
import initializeAxios from './axios-setup';
import { axiosRequestConfiguration } from './config';
import { localStore } from 'src/helpers/storage-helper';
import { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environment';

const axiosInstance = initializeAxios(axiosRequestConfiguration);
const noRetryCodes = [ 503, 504, 408, 400, 403 ];


const get = <T>({
  url,
  queryParams,
  shouldAuth = false,
  retryCount = environment.apiRetryCount,
  retryDelay = environment.apiRetryDelay,
}: IApiGetProps): Observable<AxiosResponse> => {
  return defer(() =>
    axiosInstance.get( url, {
      params: queryParams,
      ...(shouldAuth && {
        headers: { Authorization: `Token ${localStore.get('token')}` },
      }),
    }).catch((error) => {
      if (error.response) {
        throw error.response;
      } else if (error.request) {
        throw error.request;
      } else if (error.message) {
        throw error.message;
      }
    })).pipe(map((result) => (result as AxiosResponse)), retryWhen((errors) => errors.pipe(delay(retryDelay), take(retryCount))));
};

const post = <T>({
  url,
  body,
  queryParams,
  shouldAuth = false,
  localStoreKey = 'token',
  retryCount = environment.apiRetryCount,
  retryDelay = environment.apiRetryDelay,
}: IApiPostProps): Observable<T | void> => {
  return defer(() =>
    axiosInstance.post<T>(url, body, {
      params: queryParams,
      ...(shouldAuth && {
        headers: { Authorization: `Token ${localStore.get(localStoreKey)}` },
      }),
    }).catch((error) => {
      if (error.response) {
        throw error.response;
      } else if (error.request) {
        throw error.request;
      } else if (error.message) {
        throw error.message;
      }
    }),
  ).pipe(map((result) => (result as AxiosResponse).data), retryWhen((observable) =>
    observable.pipe(mergeMap((response, i) => {
      if (i >= retryCount || noRetryCodes.indexOf(response.status) >= 0) {
        return throwError(() => response);
      }
      return timer(retryDelay);
    }))));
};

const put = <T>({
  url,
  body,
  queryParams,
  shouldAuth = false,
  localStoreKey = 'token',
  retryCount = environment.apiRetryCount,
  retryDelay = environment.apiRetryDelay,
}: IApiPostProps): Observable<T | void> => {
  return defer(() =>
    axiosInstance.put<T>(url, body, {
      params: queryParams,
      ...(shouldAuth && {
        headers: { Authorization: `Token ${localStore.get(localStoreKey)}` },
      }),
    }).catch((error) => {
      if (error.response) {
        throw error.response;
      } else if (error.request) {
        throw error.request;
      } else if (error.message) {
        throw error.message;
      }
    })
  ).pipe(map((result) => (result as AxiosResponse).data), retryWhen((observable) =>
    observable.pipe(mergeMap((response, i) => {
      if (i >= retryCount || noRetryCodes.indexOf(response.status) >= 0) {
        return throwError(() => response);
      }
      return timer(retryDelay);
    }))));
};

const patch = <T>({
  url,
  body,
  queryParams,
  shouldAuth = false,
  localStoreKey = 'token',
  retryCount = environment.apiRetryCount,
  retryDelay = environment.apiRetryDelay,
}: IApiPostProps): Observable<T | void> => {
  return defer(() => axiosInstance.patch<T>(url, body, {
    params: queryParams,
    ...(shouldAuth && {
      headers: { Authorization: `Token ${localStore.get(localStoreKey)}` },
    }),
  }).catch((error) => {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    } else if (error.message) {
      throw error.message;
    }
  })
  ).pipe(map((result) => (result as AxiosResponse).data), retryWhen((observable) =>
    observable.pipe(mergeMap((response, i) => {
      if (i >= retryCount || noRetryCodes.indexOf(response.status) >= 0) {
        return throwError(() => response);
      }
      return timer(retryDelay);
    }))));
};

const deleteR = <T>({
  url,
  queryParams,
  shouldAuth = false,
  localStoreKey = 'token',
  retryCount = environment.apiRetryCount,
  retryDelay = environment.apiRetryDelay,
}: IApiDeleteProps): Observable<T | void> => {
  return defer(() => axiosInstance.delete(url, {
    params: queryParams,
    ...(shouldAuth && {
      headers: { Authorization: `Token ${localStore.get(localStoreKey)}` },
    }),
  }).catch((error) => {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    } else if (error.message) {
      throw error.message;
    }
  })).pipe(
      map((result) => (result as AxiosResponse).data), retryWhen((observable) =>
        observable.pipe(mergeMap((response, i) => {
          if (i >= retryCount || noRetryCodes.indexOf(response.status) >= 0) {
            return throwError(() => response);
          }
          return timer(retryDelay);
        }))));
};

export default { get, post, put, patch, delete: deleteR };
