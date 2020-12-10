/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React from 'react';
import {
  IconButton,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

interface RaceFilterProps {
  field: string,
  ascSort: (() => void),
  descSort: (() => void),
}

const RaceFilter = (props: RaceFilterProps) => {
  const {
    field, ascSort, descSort,
  } = props;
  return (
    <div>
      {field}
      &nbsp;
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
    </div>
  );
};

export default RaceFilter;
