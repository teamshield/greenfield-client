import React from 'react';
import { connect } from 'react-redux';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  InputLabel,
} from '@material-ui/core';

//property corresponds to a value,
const descriptions = {
  Fit: {
    '1': 'Runs tight',
    '2': 'Runs slightly tight',
    '3': 'Perfect',
    '4': 'Runs slightly long',
    '5': 'Runs long',
  },
  Size: {
    '1': 'A size too small',
    '2': '1/2 a size too small',
    '3': 'Perfect',
    '4': '1/2 a size too big',
    '5': 'A size too wide',
  },
  Length: {
    '1': 'Runs Short',
    '2': 'Runs slightly short',
    '3': 'Perfect',
    '4': 'Runs slightly long',
    '5': 'Runs long',
  },
  Width: {
    '1': 'Too narrow',
    '2': 'Slightly narrow',
    '3': 'Perfect',
    '4': 'Slightly wide',
    '5': 'Too wide',
  },
  Comfort: {
    '1': 'Uncomfortable',
    '2': 'Slightly uncomfortable',
    '3': 'Ok',
    '4': 'Comfortable',
    '5': 'Perfect',
  },
  Quality: {
    '1': 'Poor',
    '2': 'Below average',
    '3': 'What I expected',
    '4': 'Pretty great',
    '5': 'Perfect',
  },
};

const useStyles = makeStyles(theme => ({
  titleError: {
    color: theme.palette.error.dark,
  },
  category: {
    margin: theme.spacing(0),
    fontSize: 15,
  },
  group: {
    margin: theme.spacing(1, 0),
    marginBottom: theme.spacing(0),
  },
  col: {
    margin: theme.spacing(0),
    width: 80,
    alignContent: 'center',
  },
  label: {
    fontSize: 13,
    textAlign: 'center',
  },
}));

const Characteristics = ({ form, setForm, error, characteristics }) => {
  const classes = useStyles();
  const handleChange = e => {
    setForm(prevState => {
      let id = characteristics[e.target.name].id;
      prevState.characteristics[id] = Number(e.target.value);
      return { ...prevState };
    });
  };

  //for each character that exists, display radio buttons in a group,
  //where each group corresponds to a character and contains multiple radio buttons
  //where radio buttons correspond to a character description

  return (
    <Box>
      {/* <InputLabel
        asterisk="true"
        className={error ? classes.titleError : classes.title}
        error={error}
      >
        Characteristics*
      </InputLabel> */}
      {Object.keys(characteristics).map(character => {
        let id = characteristics[character].id; //id corresponding to character
        let descriptionList = descriptions[character]; //description list corresponding to character
        let selectedValue = form.characteristics[id]; //selected radio button value for current character
        let selectedDescription = descriptionList[selectedValue]; //selected description obtained by selected value
        return (
          <FormControl component="fieldset" key={character}>
            <FormLabel className={classes.category}>
              {character}: {selectedDescription || 'None selected:'}
            </FormLabel>
            <RadioGroup
              name={character}
              value={String(selectedValue) || ''}
              onChange={handleChange}
              row
              className={classes.group}
            >
              {/* Display possible values used to find selected description and send to database */}
              {['1', '2', '3', '4', '5'].map(value => {
                return (
                  <FormControlLabel
                    value={value}
                    control={<Radio color="primary" />}
                    label={
                      <Typography className={classes.label}>
                        {value === '2' || value === '4'
                          ? ''
                          : descriptionList[value]}
                      </Typography>
                    }
                    labelPlacement="bottom"
                    key={value}
                    className={classes.col}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        );
      })}
    </Box>
  );
};

let mapStateToProps = state => ({
  characteristics: state.metaInfo.characteristics,
});

export default connect(
  mapStateToProps,
  null
)(Characteristics);
