import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { CheckboxContainer, Container, StyledCheckBoxGroup, StyledFormLabel, StyledToggleButton } from './styles/CheckBoxGroupStyles';
import { FieldTitle, Row } from '../../theme/Styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

function CheckBoxGroup({ id, title, options, value, onChange, onBlur, required, error, helperText = "", disabled }) {
   /*   IN CASE OF USE Checkboxgroup from material-ui use this function for return an array with options updated 
    const HandleCheckboxChange = (e) => {
     
           let currentModifiedOption = options.find((option) => option.id == e.target.id);
           currentModifiedOption.value = e.target.checked
           let newOptions = options.map((option) => option.id == currentModifiedOption.id ? currentModifiedOption : option);
           return newOptions;
    }
    */

    return (
        <Container>
            <Row>
                <FieldTitle>{title} </FieldTitle>
                <div style={{ width: '5px' }} />
                {required ?
                    <Fragment>
                        <FieldTitle style={{ color: COLORS.red }}>*</FieldTitle>
                    </Fragment>
                    : null}
            </Row>

            <FormControl disabled={disabled} error={error} component='fieldset' variant='standard'>
                <FormGroup>
                    {/* checkboxgroup from material-ui
                        options?.map((option, index) => (
                            <FormControlLabel key={index} control={
                                <Checkbox size='medium' checked={option.value}
                                    onChange={(e) => onChange({
                                        target: {
                                            id: id,
                                            value: HandleCheckboxChange(e)
                                        }
                                    })}
                                     onBlur={(e) =>  onBlur &&  onBlur({
                                         target: {
                                             id: id,
                                             value: HandleCheckboxChange(e)
                                         }
                                     })}
                                    id={option.id} />
                            } label={option.label} />
                        ))
                        */}

                    <StyledCheckBoxGroup size="lg" type="checkbox" value={value} onChange={(e) => onChange({
                        target: {
                            id: id,
                            value: e
                        }
                    })}>
                        {options?.map((option, index) => (
                                <StyledToggleButton type="checkbox" key={option.value} id={option.id} value={option.value} disabled={disabled}>
                                    <StyledFormLabel >
                                        {option.label}
                                    </StyledFormLabel>
                                </StyledToggleButton>
                        ))}
                    </StyledCheckBoxGroup>
                </FormGroup>
                <FormHelperText sx={{fontSize:'0.90rem'}}>{helperText}</FormHelperText>
            </FormControl>
        </Container >
    );
}

export default memo(CheckBoxGroup);