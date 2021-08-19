import React, { lazy, LazyExoticComponent } from 'react';

const MainPage = lazy(() => import('src/pages/dashboard/main'));
const AddEditPage = lazy(() => import('src/pages/dashboard/add-edit-article'));

export enum RouteName {
  MAIN = 'articles',
  ARTICLES_CREATE = 'articles/create',
  ARTICLES_EDIT = 'articles/edit/:slug',
  ARTICLES_PAGES = 'articles/page/:page',
}

export interface RouteProps {
  path: RouteName;
  exact: boolean;
  routeTitle?: string,
  dashboardSlug?: string,
  component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
}

export const routes: RouteProps[] = [
  {
    path: RouteName.MAIN,
    component: MainPage,
    routeTitle: 'articles',
    exact: true,
  },
  {
    path: RouteName.ARTICLES_PAGES,
    component: MainPage,
    routeTitle: 'articles',
    exact: true,
  },
  {
    path: RouteName.ARTICLES_CREATE,
    component: AddEditPage,
    routeTitle: 'articles',
    exact: true,
  },
  {
    path: RouteName.ARTICLES_EDIT,
    component: AddEditPage,
    routeTitle: 'articles',
    exact: true,
  },
];
