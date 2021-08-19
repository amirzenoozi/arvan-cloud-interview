import React from 'react';
import { useTranslation } from 'react-i18next';

import { Snackbar, Typography, Button, Grid } from '@material-ui/core';
import { ActionbarProps } from './action-bar.props';
import { useStyles } from './action-bar.style';

const ActionBar: React.FC<ActionbarProps> = ({
  open,
  title,
  message,
  setOpen,
  setAlertResponse,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleActionsClick = (state: boolean) => {
    setAlertResponse(state);
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      message={
        <>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <Typography color="textPrimary">{message}</Typography>
        </>
      }
      action={
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionsClick(false)}
            >
              {t('general.no')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionsClick(true)}
            >
              {t('general.yes')}
            </Button>
          </Grid>
        </Grid>
      }
      className={classes.snackbar}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    />
  );
};

export { ActionBar };
