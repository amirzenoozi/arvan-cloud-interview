import { Box, Chip, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from './main.style';
import { IColumnsProp, Table } from 'src/components/share/table';
import { getArticles } from 'src/services/api/article.api';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { Cached } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';


const Main = () => {
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const datePipe = new DatePipe();
  const { page } = useParams<{ page: string }>();
  const [ articles, setArticles ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ perPage, setPerPage ] = useState(10);
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  const tableColumns: IColumnsProp<any>[] = [
    {
      key: 'id',
      title: 'articles.index',
      width: '20',
      render: (record: any) => {
        const PageNumber = ( page !== undefined ) ? parseInt(page, 10) : 1;
        const ItemIndex = articles.indexOf(record) + 1;
        return ((perPage * (PageNumber - 1)) + ItemIndex);
      },
    },
    {
      key: 'title',
      title: 'articles.title',
      width: '45',
    },
    {
      key: 'author',
      title: 'articles.author',
      width: '45',
      render: (record: any) => {
        return `@${record['author']['username']}`;
      },
    },
    {
      key: 'tagList',
      title: 'articles.tags',
      width: '45',
      render: (record: any) => {
        return record.tagList.map((item: string, index: number) => {
          return (
            <Chip size="small" label={item} key={index} />
          );
        });
      },
    },
    {
      key: 'description',
      title: 'articles.description',
      width: '100',
    },
    {
      key: 'createdAt',
      title: 'articles.timestamp',
      width: '45',
      render: (record: any) => (record.createdAt) ? datePipe.dateConvertor(record.createdAt, 'DD MMM YYYY', locale) : '',
    },
  ];

  const tableActs = (record: any, justify: 'center' | 'flex-start') => {
    return ('Actions');
  };

  const getArticlesRecords = () => {
    setLoading(true);
    const querParams = {
      limit: perPage,
      ...(page && { offset: parseInt(page, 10) * perPage }),
    };
    getArticles(querParams).subscribe({
      next: (res: any) => {
        setArticles(res['data']['articles']);
        setLoading(false);
      },
      error: (err: any) => {
        setArticles([]);
        setLoading(false);
      },
    });
  };

  const paginate = (e: any, pageNumber: number) => {
    history.push(`/${locale}/articles/page/${pageNumber}`);
  };

  useEffect(() => {
    getArticlesRecords();
  }, []);

  useEffect(() => {
    if ( page === '1' ) {
      history.push(`/${locale}/articles`);
    }
  }, [page]);

  return (
    <Box className={classes.PageWrapper}>
      <Box className={classes.header}>
        <Typography variant="h1">All Articles</Typography>
        <div className={classes.headerActions}>
          <Tooltip title={t('general.retry')}>
            <IconButton onClick={getArticlesRecords}>
              <Cached fontSize="medium" color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <Box className={classes.contentWrapper}>
        <Paper>
          <Table
            columns={tableColumns}
            data={articles}
            loading={loading}
            collapsableSize="xs"
          />
        </Paper>
        {!!articles.length && (
          <div className={classes.footer}>
            <Pagination
              count={50}
              page={(page) ? parseInt(page, 10) : 1}
              onChange={paginate}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Main;
