import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      '& .MuiPaper-root': {
        background: theme.palette.common.white,
        flexDirection: 'column',
      },
    },
  })
);
