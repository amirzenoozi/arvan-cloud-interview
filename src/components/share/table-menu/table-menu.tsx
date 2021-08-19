import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useStyle } from './table-menu.style';
import { MoreHoriz } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

interface TableMenuProps {
  menusList: Array<{
    title: string,
    clickHandler: () => void,
  }>,
}

const TableMenu: React.FC<TableMenuProps> = ({ menusList }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ articleAnchorEl, setArticleAnchorEl ] = useState(null);

  const handleClick = (event: any) => {
    setArticleAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={articleAnchorEl}
        keepMounted
        open={Boolean(articleAnchorEl)}
        onClose={() => setArticleAnchorEl(null)}
      >
        { menusList.map(({ title, clickHandler }, index: number) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                clickHandler();
                setArticleAnchorEl(null);
              }}
            >
              { t(title) }
            </MenuItem>);
        })}
      </Menu>
    </>
  );
};

export { TableMenu };
