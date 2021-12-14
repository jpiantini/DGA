import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/CheckBoxGroupStyles';
import { Row } from '../../theme/Styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormHelperText } from '@mui/material';

function CheckBoxGroup({ id, title, options, onChange, onBlur, required, error, helperText }) {

    const HandleCheckboxChange = (e) => {
        let currentModifiedOption = options.find((option) => option.id == e.target.id);
        currentModifiedOption.value = e.target.checked
        let newOptions = options.map((option) => option.id == currentModifiedOption.id ? currentModifiedOption : option);
        return newOptions;
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
                    {
                        options?.map((option, index) => (
                            <FormControlLabel key={index} control={
                                <Checkbox size='medium' checked={option.value}
                                    onChange={(e) => onChange({
                                        target: {
                                            id: id,
                                            value: HandleCheckboxChange(e)
                                        }
                                    })}
                                    /* onBlur={(e) => onBlur({
                                         target: {
                                             id: id,
                                             value: HandleCheckboxChange(e)
                                         }
                                     })}*/
                                    id={option.id} />
                            } label={option.label} />
                        ))
                    }
                </FormGroup>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </Container >
    );
}

export default memo(CheckBoxGroup);