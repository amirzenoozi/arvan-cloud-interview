import { RouteName } from 'src/pages/dashboard/dashborad.routes';
import { IMenuItem } from './menus.interface';
import { Dashboard } from '@material-ui/icons';
import { NoteAdd } from '@material-ui/icons';

export const menus: IMenuItem[] = [
  {
    label: 'sidebar.dashboard',
    icon: Dashboard,
    path: RouteName.MAIN,
  },
  {
    label: 'sidebar.addArticle',
    icon: NoteAdd,
    path: RouteName.ARTICLES_CREATE,
  },
];
