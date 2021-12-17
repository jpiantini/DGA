import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/CheckBoxStyles';
import { Row } from '../../theme/Styles';
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
                <Title>{title} </Title>
                <div style={{ width: '5px' }} />
                {required ?
                    <Fragment>
                        <Title style={{ color: COLORS.red }}>*</Title>
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
                            onBlur={(e) => onBlur({
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