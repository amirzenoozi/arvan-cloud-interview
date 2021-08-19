import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IllustrationViewerProps } from './illustration-viewer.props';
import { useStyle } from './illustration-viewer.style';


const IllustrationViewer: React.FC<IllustrationViewerProps> = ({
  isLoading = false,
  illustration,
  title,
  content,
  hasGradient = true,
  btnTitle,
  btnAction,
  fullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <Box className={clsx([ classes.noLog, { [classes.noBg]: !hasGradient, [classes.fullHeight]: fullHeight }])}>
      {illustration && <img className={classes.noLogImage} src={'/illustrations/' + illustration} alt='No Data To Show!' />}
      {isLoading &&
        <div className={classes.loadingWrapper}>
          <span className={classes.loadingNode} />
          <span className={classes.loadingNode} />
        </div>
      }
      {title && <Typography className={classes.noLogTexts} component='p' variant='h2'>{t(title)}</Typography>}
      {content && <Typography className={classes.noLogTexts} component='p' variant='h5'>{t(content)}</Typography>}
      {btnTitle && <Button className={classes.actionBtn} variant='contained' color='primary' onClick={btnAction}>{btnTitle}</Button>}
    </Box>
  );
};

export { IllustrationViewer };
