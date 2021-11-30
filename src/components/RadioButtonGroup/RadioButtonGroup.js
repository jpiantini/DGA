import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/RadioButtonGroupStyles';
import { Row } from '../../theme/Styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

function RadioButtonGroup({ id, title, options, value, onChange, required }) {



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
            <FormGroup>
                <RadioGroup name={id} value={value} onChange={onChange} >
                    {
                        options?.map((option) => (
                            <FormControlLabel value={option.value} control={<Radio sx={{ color: COLORS.tertiary }} />} label={option.label} />
                        ))
                    }
                </RadioGroup>
            </FormGroup>
        </Container>
    );
}

export default memo(RadioButtonGroup);