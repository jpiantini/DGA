import { Fragment, memo } from 'react';
import COLORS from '../../theme/Colors';
import { Title, Container } from './styles/TextFieldStyles';
import InputMask from 'react-input-mask';
import { Row, StyledTextInput } from '../../theme/Styles';


function TextField({ id, title, placeholder, helperText, value, onChange, onBlur, type, error, mask, unMaskedValue, required, multiline }) {

    const removeTextFromInputMaskValue = (value) => {
        let NewValue = value.replace(/[^0-9\.]+/g, '');
        return NewValue;
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

            {
                mask ?
                    <InputMask
                        id={id}
                        mask={mask}
                        maskChar={null}
                        value={value}
                        onBlur={
                            unMaskedValue ?
                                (e) => {
                                    onBlur({
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
                                fullWidth
                                variant='outlined'
                                placeholder={placeholder}
                                type={type}
                                helperText={helperText}
                                error={error}
                            />
                        }
                    </InputMask>
                    :
                    <StyledTextInput
                        fullWidth
                        multiline={multiline}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        type={type}
                        helperText={helperText}
                        error={error}
                    />
            }
        </Container>
    );
}

export default memo(TextField);