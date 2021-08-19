import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    'noLog': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      backgroundImage: 'linear-gradient(to bottom,  rgba(240,240,247,1) 0%,rgba(255,255,255,1) 100%)',
      padding: theme.spacing(1, 2),
      width: '100%',
    },
    'noBg': {
      backgroundImage: 'none',
    },
    'fullHeight': {
      height: 'calc(100vh - 120px)',
    },
    'noLogTexts': {
      textAlign: 'center',
    },
    'noLogImage': {
      width: '400px',
      maxWidth: '90%',
      marginBottom: theme.spacing(3),
    },
    'loadingWrapper': {
      width: '64px',
      height: '64px',
      position: 'relative',
      marginBottom: theme.spacing(3),
    },
    'loadingNode': {
      'width': '100%',
      'height': '100%',
      'borderRadius': '50%',
      'backgroundColor': theme.palette.primary.light,
      'opacity': 0.6,
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'animation': '$DoubleBounce 2.0s infinite ease-in-out',

      '&:nth-child(2)': {
        animationDelay: '-1.0s',
      },
    },
    'actionBtn': {
      margin: '0 auto',
      marginTop: theme.spacing(3),
    },
    '@keyframes DoubleBounce': {
      '0%': { transform: 'scale(0)' },
      '100%': { transform: 'scale(0)' },
      '50%': { transform: 'scale(1.0)' },
    },
  })
);

export { useStyle };
