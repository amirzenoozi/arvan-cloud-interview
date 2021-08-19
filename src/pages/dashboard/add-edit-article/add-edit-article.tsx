import {
  Box, Button, Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel, ListItemText, MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStyle } from './add-edit-article.style';
import { createNewArticle } from 'src/services/api/article.api';
import { getArticleBySlug } from 'src/services/api/article.api';
import { getArticleTags } from 'src/services/api/article.api';
import { updateArticleBySlug } from 'src/services/api/article.api';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import { useHistory, useParams } from 'react-router-dom';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';


const AddEditArticle = () => {
  const classes = useStyle();
  const history = useHistory();
  const { slug } = useParams<{ slug: string }>();
  const [ isWaiting, setIsWaiting ] = useState<boolean>(false);
  const [ tagsList, setTagsList ] = useState<Array<any>>([]);
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This Field is required'),
    description: Yup.string().required('This Field is required'),
    body: Yup.string().required('This Field is required'),
    tagList: Yup.array(),
  });

  const createArticle = ( formikValues: any ) => {
    setIsWaiting( (prevState: boolean) => true );
    createNewArticle({ article: formikValues }).subscribe({
      next: (res: any) => {
        setIsWaiting(false);
        history.push(`/${locale}/articles`);
      },
      error: (res: any) => {
        setIsWaiting(false);
      },
    });
  };

  const updateArticle = ( formikValues: any ) => {
    setIsWaiting( (prevState: boolean) => true );
    updateArticleBySlug(slug, { article: formikValues }).subscribe({
      next: (res: any) => {
        setIsWaiting(false);
      },
      error: (res: any) => {
        setIsWaiting(false);
      },
    });
  };

  const formSubmitHandler = ( values: FormikValues ) => {
    ( slug === undefined ) ? createArticle( values ) : updateArticle(values);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
    validationSchema: validationSchema,
    onSubmit: formSubmitHandler,
  });

  useEffect(() => {
    getArticleTags().subscribe({
      next: (res: any) => {
        setTagsList(res['data']['tags'].sort((a: string, b: string) => a.localeCompare(b) ));
      },
      error: (error: any) => {
        setTagsList([]);
      },
    });
  }, []);

  useEffect(() => {
    if ( !slug ) return;
    getArticleBySlug( slug ).subscribe({
      next: (res: any) => {
        Object.keys(res['data']['article']).forEach((field: any) => {
          formik.setFieldValue(field, res['data']['article'][field]);
        });
      },
      error: (err: any) => {},
    });
  }, [slug]);

  return (
    <Box className={classes.PageWrapper}>
      <Box className={classes.header}>
        <Typography variant="h1">{ (slug) ? 'Edit Article' : 'Add New Article' }</Typography>
        <div className={classes.headerActions} />
      </Box>
      <Box className={classes.contentWrapper}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="tags">Tags</InputLabel>
                <Select
                  fullWidth
                  labelId="tags"
                  name="tagList"
                  multiple={true}
                  value={formik.values.tagList}
                  MenuProps={MenuProps}
                  label={'Tags'}
                  renderValue={(selected: any) => {
                    return selected.join(', ');
                  }}
                  onChange={formik.handleChange}
                >
                  {tagsList.map((item: any, index: number) => (
                    <MenuItem value={item} key={index}>
                      <Checkbox checked={formik.values.tagList.indexOf(item) > -1} />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  name="body"
                  label="Content Body"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  error={formik.touched.body && Boolean(formik.errors.body)}
                  helperText={formik.touched.body && formik.errors.body}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box className={classes.FormFooter}>
            <div className={classes.SubmitBtnWrapper}>
              <Button color="primary" variant="contained" type="submit" size="large" disabled={isWaiting || !formik.dirty}>
                Submit
              </Button>
              { isWaiting && <CircularProgress size={24} className={classes.buttonProgress}/>}
            </div>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddEditArticle;
