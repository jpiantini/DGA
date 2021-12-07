import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/CheckBoxGroupStyles';
import { Row } from '../../theme/Styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CheckBoxGroup({ id, title, options, onChange,onBlur, required }) {

    const HandleCheckboxChange = (e) => {
        let currentModifiedOption = options.find((option) => option.id == e.target.id);
        console.log(currentModifiedOption)
        currentModifiedOption.value = e.target.checked
        let newOptions = options.map((option) => option.id == currentModifiedOption.id ? currentModifiedOption : option);
        console.log(newOptions)
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
            <FormGroup>

                {
                    options?.map((option,index) => (
                        <FormControlLabel key={index} control={
                            <Checkbox size="medium" checked={option.value}
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
        </Container>
    );
}

export default memo(CheckBoxGroup);