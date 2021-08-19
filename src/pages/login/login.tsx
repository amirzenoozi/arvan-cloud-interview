import React, { useEffect, useState } from 'react';
import { useStyle } from 'src/pages/login/login.style';
import * as Yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/redux/actions';
import { useHistory } from 'react-router-dom';
import { localStore } from 'src/helpers/storage-helper';
import jwt from 'jwt-decode';
import moment from 'moment';
import { AppState } from 'src/redux/store';
import { userLogin } from 'src/services/api/user.api';

// Materia-l UI Components
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyle();
  const [ isWaiting, setIsWaiting ] = useState<boolean>(false);
  const { locale } = useSelector((state: AppState) => state.AppSetting );
  const { token } = useSelector((state: AppState) => state.User);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This Field is required'),
    password: Yup.string().required('This Field is required'),
  });

  useEffect( () => {
    if ( localStore.get('token') !== null ) {
      const decodedJwt: any = jwt(localStore.get('token'));
      const now = moment();
      const expDate = moment(decodedJwt['iat'] * 1000);
      if (expDate.isValid()) {
        history.push(`/${locale}/articles`);
      } else {
        localStorage.removeItem('token');
        history.push('/login');
      }
    }
  }, []);

  const formSubmitHandler = ( values: FormikValues ) => {
    setIsWaiting( (prevState: boolean) => true );
    userLogin({ user: { email: values.username, password: values.password }}).subscribe({
      next: ( response: any) => {
        dispatch(actions.User.setUserInfo({
          token: response['user']['token'],
          avatar: response['user']['image'],
          firstName: response['user']['username'],
        }));
        setTimeout( () => {
          history.push(`/${locale}/articles`);
        }, 1000);
      },
      error: (err) => {
        setIsWaiting( (prevState: boolean) => false );
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: formSubmitHandler,
  });

  return (
    <Box className={classes.PageContainer}>
      <Paper className={classes.Wrapper}>
        <Box className={classes.FormWrapper}>
          <div className={classes.FormHeader}>
            <Typography variant='h2' component='p' className={classes.FormTitle}><strong>Login</strong></Typography>
            <Typography variant='subtitle1' component='p'>Surveillance Smart Control</Typography>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box className={classes.FormFooter}>
              <div className={classes.SubmitBtnWrapper}>
                <Button fullWidth color="primary" variant="contained" type="submit" size="large" disabled={isWaiting || !formik.dirty}>
                  Login
                </Button>
                { isWaiting && <CircularProgress size={24} className={classes.buttonProgress}/>}
              </div>
              <div className={classes.SubmitBtnWrapper}>
                <Button fullWidth color="primary" type="button" size="small" >
                  Forget Password
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
