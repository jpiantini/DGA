import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import {  Container } from './styles/CheckBoxStyles';
import { FieldTitle, Row } from '../../theme/Styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

function CheckBox({ id, title, label, value, onChange, onBlur, required, error, helperText=" " }) {

    const HandleCheckboxChange = (e) => {
        if (e.target.checked) {
            return true;
        } else {
            return false;
        }
    }

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
            <FormControl required={required} error={error} component='fieldset' variant='standard'>
                <FormGroup>
                    <FormControlLabel control={
                        <Checkbox size='medium' checked={value}
                            onChange={(e) => onChange({
                                target: {
                                    id: id,
                                    value: HandleCheckboxChange(e)
                                }
                            })}
                            onBlur={(e) => onBlur && onBlur({
                                target: {
                                    id: id,
                                    value: HandleCheckboxChange(e)
                                }
                            })}
                            id={id} />
                    } label={label ? label : ''} />


                </FormGroup >
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>

        </Container>
    );
}

export default memo(CheckBox);