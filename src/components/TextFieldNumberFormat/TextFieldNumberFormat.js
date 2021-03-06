import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Container } from './styles/TextFieldNumberFormatStyles';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import NumberFormat from 'react-number-format';

function TextFieldNumberFormat({ id, title, placeholder, helperText = " ", value, onChange, onBlur, type, error, mask, unMaskedValue, useMaskPresets, required, multiline, minLength, maxLength, max, min, disabled, isLoading }) {

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

            <NumberFormat
                type={type}
                thousandSeparator={true}
                onValueChange={({ value: v }) => onChange({ target: { id:id, value: v } })}
                decimalScale={2}
                customInput={StyledTextInput}
                fullWidth
                disabled={disabled}
                multiline={multiline}
                id={id}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                helperText={helperText}
                FormHelperTextProps={{sx:{fontSize:'0.90rem'}}}
                error={error}
                inputProps={{
                    maxLength: maxLength,
                    minLength: minLength,
                    max: max,
                    min: min,
                }}
            />
        </Container>
    );
}

export default memo(TextFieldNumberFormat);