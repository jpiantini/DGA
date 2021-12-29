import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Container } from './styles/TimePickerStyles';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileTimePicker from '@mui/lab/MobileTimePicker';


function TimePicker({ id, title, placeholder, helperText = " ", value, onChange, onBlur, disabled, error, required }) {

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
                    onBlur={(e) => {
                        onBlur && onBlur({
                            target: {
                                id: id,
                                value: e
                            }
                        });
                    }
                    }
                    disabled={disabled}
                />
            </LocalizationProvider>
        </Container>
    );
}

export default memo(TimePicker);