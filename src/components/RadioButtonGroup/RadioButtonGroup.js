import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import {  Container } from './styles/RadioButtonGroupStyles';
import { FieldTitle, Row } from '../../theme/Styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { FormControl, FormHelperText } from '@mui/material';

function RadioButtonGroup({ id, title, options, value, onChange, onBlur, required, row, helperText=" ", error,disabled }) {
    const radioValue = value === undefined ? "":value
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
            <FormControl disabled={disabled} required={required} error={error} component='fieldset' variant='standard'>
                <FormGroup >
                    <RadioGroup name={id} value={radioValue} onChange={onChange} onBlur={onBlur} row={row}>
                        {
                            options?.map((option) => (
                                <FormControlLabel key={option.value} value={option.value} control={<Radio sx={{ color: COLORS.tertiary }} />} label={option.label} />
                            ))
                        }
                    </RadioGroup>
                </FormGroup>
                <FormHelperText sx={{fontSize:'0.90rem'}}>{helperText}</FormHelperText>
            </FormControl>
        </Container>
    );
}

export default memo(RadioButtonGroup);