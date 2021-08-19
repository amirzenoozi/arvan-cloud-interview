import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    PageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '90%',
    },
    contentWrapper: {
      width: '100%',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
      width: '100%',
    },
    headerActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2, 0),
    },
    ArticleMenu: {
      position: 'relative',
    },
  })
);

export { useStyle };
