import { Fragment, memo, useState } from 'react';
import COLORS from '../../theme/Colors';
import { Container, InputFile, StyledUploadFileIcon, InputFileButtonContainer, RowContainer, RowSeparator, StyledFolderIcon } from './styles/UploadFileStyles';
import { FieldTitle, Row, StyledTextInput } from '../../theme/Styles';
import FormModal from '../FormModal/FormModal';


function UploadFile({ id, title, placeholder, helperText = " ", onChange, onBlur, error, required }) {

    const [documentModalIsOpen, setDocumentModalIsOpen] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFileName(e.target.files[0].name);
            return e.target.files[0]
        }
    }

    const handleModalVisibility = () => {
        setDocumentModalIsOpen(!documentModalIsOpen);
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


            <RowContainer>
                <StyledTextInput
                    fullWidth
                    placeholder={placeholder}
                    value={selectedFileName}
                    helperText={helperText}
                    error={error}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <RowSeparator />
                <div onClick={handleModalVisibility} title='Seleccionar documento'>
                    <StyledFolderIcon />
                </div>
                <RowSeparator />
                <InputFileButtonContainer title='Subir archivo' htmlFor={id}>
                    <StyledUploadFileIcon />
                </InputFileButtonContainer>
                <InputFile id={id} type='file'
                    onBlur={(e) => {
                        onBlur && onBlur({
                            target: {
                                id: id,
                                value: handleFileChange(e)
                            }
                        });
                    }
                    }
                    onChange={(e) => {
                        onChange({
                            target: {
                                id: id,
                                value: handleFileChange(e)
                            }
                        });
                    }
                    } />
            </RowContainer>
            <FormModal open={documentModalIsOpen} onClose={handleModalVisibility} title="Seleccionar documento">
          
            </FormModal>
        </Container>
    );
}

export default memo(UploadFile);