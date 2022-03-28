import { useState, useLayoutEffect, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    BodyText,
    SmallHeightDivider,
    StyledButtonOutlined,
    StyledTextInput,
    SubTitle
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Container,
    ButtonContainer,
    ChatContainer,
    ChatBottomContainer,
    StyledSendIcon,
    ButtonMessageContainer,
    InputMessageContainer,
    MessageItem,
    ChatTopContainer,
    MessageDateText,
    MessageText
} from '../../styles/ServiceRequestedDetailsStyles';
import { InformationFormSchema } from './MessagesConstants';
import TextField from '../../../../components/TextField/TextField';
import { useQueryClient, useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { sendRequiredAction } from '../../../../api/ActionRequired';
import { useFormik } from 'formik';
import { HideGlobalLoading, ShowGlobalLoading } from '../../../../redux/actions/UiActions';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { replaceGuionToSlashFromString } from '../../../../utilities/functions/StringUtil';

function Messages() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const cleanRequestID = requestID.replace('payment', '');

    const requestData = queryClient.getQueryData(['serviceRequestedDetail', cleanRequestID]);
    const userData = queryClient.getQueryData(['userData']);

    const actionRequiredMutation = useMutation(sendRequiredAction, {
        onMutate: (req) => {
            dispatch(ShowGlobalLoading('Cargando'));
        }
    });

    const textFormik = useFormik({
        initialValues: {
            information: ''
        },
        validationSchema: InformationFormSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        const reqData = {
            entityAttributeId: 'response',
            entityAttributeValue: values.information,
            requestId: requestData.request.id,
        }
        actionRequiredMutation.mutate(reqData, {
            onSuccess: () => {
                enqueueSnackbar("Información requerida enviada satisfactoriamente", { variant: "success" })
                queryClient.invalidateQueries(['serviceRequestedDetail', cleanRequestID])
            },
            onError: () => {
                enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
            },
            onSettled: () => {
                dispatch(HideGlobalLoading());
            }
        })
    }

    const Messages = requestData.request.comments.map((message) => {
        return {
            id: message.id,
            text: message.text,
            user_id: message?.user_id,
            isUserMessage: message?.user_id != 2 ? true : false,
            created_at: message.created_at
        }
    })

    return (
        <Container >
            <TextInformation title="Mensajes" />
            <SmallHeightDivider />
            <ChatContainer>
                <ChatTopContainer isEmpty={Messages.length > 0 ? false:true}>
                <SmallHeightDivider />
                    {
                        Messages.length > 0 ?
                        Messages.map((message) => (
                            <MessageItem isUserMessage={message.isUserMessage}>
                                <MessageText>
                                    {
                                        message.text
                                    }
                                </MessageText>
                                <MessageDateText>
                                    {
                                        format(new Date(replaceGuionToSlashFromString(message.created_at)), "dd 'de' MMMM yyyy hh:mm a", { locale: es })
                                    }
                                </MessageDateText>
                            </MessageItem>
                        ))
                        :
                        <SubTitle style={{alignSelf:'center',justifySelf:'center'}}>NO HAY MENSAJES</SubTitle>
                    }
                </ChatTopContainer>
                {requestData.request.request_actions_id == 3 &&
                    <ChatBottomContainer>
                        <InputMessageContainer>
                            <StyledTextInput hiddenBorder multiline maxRows={1}
                                placeholder="Escriba aqui su mensaje" inputProps={{ maxLength: 500 }}
                                id="information"
                                value={textFormik.values.information}
                                onChange={textFormik.handleChange}
                                onBlur={textFormik.handleBlur}
                            //    error={textFormik.touched.information && Boolean(textFormik.errors.information)}
                            //    helperText={textFormik.touched.information && textFormik.errors.information}
                            />
                        </InputMessageContainer>
                        <ButtonMessageContainer>
                            <IconButton onClick={() => textFormik.handleSubmit()}>
                                <StyledSendIcon />
                            </IconButton>
                        </ButtonMessageContainer>
                    </ChatBottomContainer>
                }

            </ChatContainer>

            {/*  <TextField id="information" title="Información"
                value={textFormik.values.information}
                onChange={textFormik.handleChange}
                onBlur={textFormik.handleBlur}
                error={textFormik.touched.information && Boolean(textFormik.errors.information)}
                helperText={textFormik.touched.information && textFormik.errors.information}
                multiline
                maxLength={255}
                required
            />
            <SmallHeightDivider />
            <ButtonContainer>
                <StyledButtonOutlined onClick={() => textFormik.handleSubmit()} variant="outlined">ENVIAR</StyledButtonOutlined>
            </ButtonContainer>
    */}
        </Container>
    );
}

export default Messages;
