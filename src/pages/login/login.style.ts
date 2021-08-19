import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    PageContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      backgroundImage: `linear-gradient(316deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 74%)`,
    },
    Wrapper: {
      maxWidth: '100%',
      borderRadius: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      margin: theme.spacing(2),
      overflow: 'hidden',
      width: '400px',
    },
    FormWrapper: {
      padding: theme.spacing(3, 2, 3, 2),
      flex: '0 0 100%',
    },
    FormHeader: {
      marginBottom: theme.spacing(5),
    },
    FormTitle: {},
    SubmitBtnWrapper: {
      position: 'relative',
      marginBottom: theme.spacing(1),
      width: '100%',
    },
    FormFooter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: theme.spacing(3, 0, 0),
    },
    buttonProgress: {
      color: theme.palette.success.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export { useStyle };
