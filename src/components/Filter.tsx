/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {
  IconButton,
} from '@material-ui/core';

interface FilterProps {
  field: string,
  ascSort: (() => void),
  descSort: (() => void),
  twoRow: boolean,
}

const Filter = (props: FilterProps) => {
  const {
    field, ascSort, descSort, twoRow,
  } = props;
  if (twoRow) {
    return (
      <div>
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
      </div>
    );
  }
  return (
    <div style={{ display: 'inline' }}>
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

export default Filter;
