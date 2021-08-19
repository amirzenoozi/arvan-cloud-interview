import {
  Box, Button,
  Chip,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper, Snackbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from './main.style';
import { IColumnsProp, Table } from 'src/components/share/table';
import { getArticles } from 'src/services/api/article.api';
import { removeArticleBySlug } from 'src/services/api/article.api';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { Cached } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Pagination } from '@material-ui/lab';
import { TableMenu } from 'src/components/share/table-menu';

interface snackBar {
  type: 'success' | 'info' | 'warning' | 'error',
  message: string,
  duration: number,
  isOpen: boolean,
}

const Main = () => {
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const datePipe = new DatePipe();
  const { page } = useParams<{ page: string }>();
  const [ articles, setArticles ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ perPage, setPerPage ] = useState(10);
  const [ selectToDelete, setSelectToDelete ] = useState('');
  const [ snackBar, setSnackBar ] = useState<snackBar>({ type: 'success', message: '', duration: 5000, isOpen: false });
  const [ isRemoveModalOpen, setIsRemoveModalOpen ] = React.useState(false);
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
    {
      key: 'Actions',
      title: 'articles.actions',
      width: '20',
      render: (record) => tableActs(record, 'center'),
    },
  ];

  const tableActs = (record: any, justify: 'center' | 'flex-start') => {
    const Menus = [
      {
        title: 'articles.edit',
        clickHandler: () => {
          history.push(`/${locale}/articles/edit/${record.slug}`);
        },
      }, {
        title: 'articles.remove',
        clickHandler: () => {
          setSelectToDelete(record.slug);
          setIsRemoveModalOpen(true);
        },
      },
    ];
    return (
      <TableMenu menusList={Menus} />
    );
  };

  const getArticlesRecords = () => {
    setLoading(true);
    const queryParams = {
      limit: perPage,
      ...(page && { offset: parseInt(page, 10) * perPage }),
    };
    getArticles(queryParams).subscribe({
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

  const removeSingleArticle = () => {
    removeArticleBySlug( selectToDelete ).subscribe({
      next: (res: any) => {
        setIsRemoveModalOpen(false);
        setSelectToDelete('');
        getArticlesRecords();
      },
      error: (err: any) => {
        setSnackBar({ type: 'error', message: err.data.errors.body[1], duration: 5000, isOpen: true });
        setIsRemoveModalOpen(false);
        setSelectToDelete('');
      },
    });
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, isOpen: false });
  };

  useEffect(() => {
    getArticlesRecords();
  }, []);

  useEffect(() => {
    if ( page === '1' ) {
      history.push(`/${locale}/articles`);
    } else {
      getArticlesRecords();
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
              count={20}
              page={(page) ? parseInt(page, 10) : 1}
              onChange={paginate}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        )}
      </Box>
      <Dialog
        open={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Article</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure to Delete this Article ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsRemoveModalOpen(false);
            setSelectToDelete('');
          }} color="primary">No</Button>
          <Button onClick={removeSingleArticle} color="primary" autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackBar.isOpen} autoHideDuration={snackBar.duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBar.type}>{ snackBar.message }</Alert>
      </Snackbar>
    </Box>
  );
};

export default Main;
