import {
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomTextField = withStyles({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0,0.0)',
    },
    '& .MuiFormLabel-root.Mui-disabled': {
      color: 'rgba(0, 0, 0,0.0)',
    },
  },
})(TextField);

export default CustomTextField;
