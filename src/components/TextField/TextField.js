import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Container } from './styles/TextFieldStyles';
import InputMask from 'react-input-mask';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import CircularProgress from '@mui/material/CircularProgress';

function TextField({ id, title, placeholder, helperText = " ", value, onChange, onBlur, type, error, mask, unMaskedValue, useMaskPresets, required, multiline, minLength, maxLength, max, min, disabled, isLoading }) {

    const removeTextFromInputMaskValue = (value) => {
        let NewValue = value.replace(/[^0-9\.]+/g, '');
        return NewValue;
    }

    const maskPresets = {
        phone: "(999)-999-9999",
        identification: "999-9999999-9",
        passport: "*",
        rnc: "9-99-99999-9",
        'solo numero': "999999999999999999999999999",
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

            {
                mask ?
                    <InputMask
                        id={id}
                        mask={useMaskPresets ? maskPresets[mask] || maskPresets['passport'] : mask}
                        maskChar={null}
                        value={value}
                        disabled={disabled}
                        onBlur={
                            unMaskedValue ?
                                (e) => {
                                    onBlur && onBlur({
                                        target:
                                        {
                                            id: e.target.id,
                                            value: removeTextFromInputMaskValue(e.target.value)
                                        }
                                    })
                                }
                                :
                                onBlur
                        }
                        onChange={
                            unMaskedValue ?
                                (e) => {
                                    onChange({
                                        target:
                                        {
                                            id: e.target.id,
                                            value: removeTextFromInputMaskValue(e.target.value)
                                        }
                                    })
                                }
                                :
                                onChange
                        }>

                        {(inputProps) =>
                            <StyledTextInput
                                {...inputProps}
                                disabled={disabled}
                                fullWidth
                                variant='outlined'
                                placeholder={placeholder}
                                type={type}
                                helperText={helperText}
                                error={error}
                                InputProps={{
                                    endAdornment: isLoading ? (
                                        <CircularProgress size='1em' />
                                    )
                                        :
                                        null
                                }}
                            />
                        }
                    </InputMask>
                    :
                    <StyledTextInput
                        fullWidth
                        disabled={disabled}
                        multiline={multiline}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        type={type}
                        helperText={helperText}
                        error={error}
                        inputProps={{
                            maxLength: maxLength,
                            minLength: minLength,
                            max: max,
                            min: min,
                        }}
                        InputProps={{
                            endAdornment: isLoading ? (
                                <CircularProgress size='1em' />
                            )
                                :
                                null,
                        }}
                    />
            }
        </Container>
    );
}

export default memo(TextField);