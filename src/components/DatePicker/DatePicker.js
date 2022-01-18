import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Container } from './styles/DatePickerStyles';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';


function DatePicker({ id, title, placeholder, helperText = " ", value, onChange, onBlur, disabled, error, required }) {
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
                <MobileDatePicker
                    id={id}
                    cancelText="Cancelar"
                    okText="Aceptar"
                    toolbarTitle={title}
                    inputFormat='dd/MM/yyyy'
                    renderInput={props => <StyledTextInput {...props} helperText={helperText} error={error} />}
                    toolbarPlaceholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        onChange({
                            target: {
                                id: id,
                                value: e
                            }
                        })
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

export default memo(DatePicker);