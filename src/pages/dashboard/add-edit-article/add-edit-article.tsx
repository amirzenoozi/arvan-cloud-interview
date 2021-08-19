import { Box, Chip, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from './add-edit-article.style';
import { IColumnsProp, Table } from 'src/components/share/table';
import { getArticles } from 'src/services/api/article.api';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { Cached } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';


const AddEditArticle = () => {
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const datePipe = new DatePipe();
  const { page } = useParams<{ page: string }>();
  const [ articles, setArticles ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ perPage, setPerPage ] = useState(10);
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  useEffect(() => {}, []);

  return (
    <Box className={classes.PageWrapper}>
      <Box className={classes.header}>
        <Typography variant="h1">All Articles</Typography>
        <div className={classes.headerActions}>
        </div>
      </Box>
      <Box className={classes.contentWrapper}>
      </Box>
    </Box>
  );
};

export default AddEditArticle;
