import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/TimePickerStyles';
import { Row, StyledTextInput } from '../../theme/Styles';
import MUITimePicker from '@mui/lab/TimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileTimePicker from '@mui/lab/MobileTimePicker';


function TimePicker({ id, title, placeholder, helperText = " ", value, onChange, onBlur, disabled, error, required }) {

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileTimePicker
                    id={id}
                    cancelText="Cancelar"
                    okText="Aceptar"
                    toolbarTitle={title}
                    renderInput={props => <StyledTextInput  {...props} helperText={helperText} error={error} />}
                    toolbarPlaceholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        onChange({
                            target: {
                                id: id,
                                value: e
                            }
                        });
                    }
                    }
                    inputProps={{ readOnly: true }}
                    onBlur={onBlur}
                    disabled={disabled}
                />
            </LocalizationProvider>
        </Container>
    );
}

export default memo(TimePicker);