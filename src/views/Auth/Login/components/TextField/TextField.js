import { useState } from 'react';
import { StyledTextInput } from './styles/TextFieldStyles';

function LoginTextField(props) {

    return (
        <StyledTextInput
            {...props}
            variant="outlined"
            InputProps={{
                style: {
                    borderRadius: '15px',
                    width: '100%',
                    height: '50px',
                    fontSize: '17px',
                    backgroundColor: '#d9d9d9'
                }
            }}
        />
    );
}

export default LoginTextField;




