/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {
  TableCell,
  IconButton,
} from '@material-ui/core';

interface RaceFilterTwoProps {
  field: string,
  ascSort: (() => void),
  descSort: (() => void),
}

const RaceFilterTwoRow = (props: RaceFilterTwoProps) => {
  const {
    field, ascSort, descSort,
  } = props;
  return (
    <TableCell>
      {field}
      <br />
      <IconButton
        color="inherit"
        edge="start"
        onClick={ascSort}
      >
        <ArrowUpwardIcon
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 10,
            height: 10,
          }}
        />
      </IconButton>
      <IconButton
        color="inherit"
        edge="start"
        onClick={descSort}
      >
        <ArrowDownwardIcon
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 10,
            height: 10,
          }}
        />
      </IconButton>
    </TableCell>
  );
};

export default RaceFilterTwoRow;
