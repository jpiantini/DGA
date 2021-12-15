import { useState, useEffect, memo } from 'react';
import {
    BodyText,
    BodyTextBold,
    SmallHeightDivider,
    StyledButtonOutlined,
    StyledButton,
    MediumHeightDividers
} from '../../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Container,
} from '../styles/FormStyles';
import { localToArray } from '../../../../../utilities/functions/ArrayUtil';
import { useFormik } from 'formik';
import * as  yup from 'yup';
import {  getFieldValidation } from '../FormFunctions';
import RenderField from '../components/RenderField';
import { localToString } from '../../../../../utilities/functions/StringUtil';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { RULE_LIST } from './FormConstants';

function ModalForm(props) {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [state, setState] = useState({});
    const [schemaValidation, setSchemaValidation] = useState({});
    const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched } = useFormik({
        initialValues: state,
        onSubmit: (values, actions) => localDoRequest({ values, actions }),
        validationSchema: yup.object().shape(schemaValidation),
        enableReinitialize: true,
    });

    useEffect(() => {
        if (props.isVisible && localToArray(props.fields).length > 0) {
            const innerState = { ...state, ...values }
            const innerSchema = {}
            props.fields.map((field) => {
                const validator = getFieldValidation(field)
                if (validator) {
                    innerSchema[field.fieldKey] = getFieldValidation(field)
                }
                if (!innerState[field.fieldKey]) {
                    innerState[field.fieldKey] = undefined
                }
            })
            setState(innerState)
            setSchemaValidation(innerSchema)
        }
        return () => { }
    }, [props.isVisible, props.fields])

    useEffect(() => {
        if (!props.isVisible) {
          resetForm()
          setState({})
        }
        return () => { }
      }, [props.isVisible])

      const localDoRequest = ({ values, actions }) => {
        props.doRequest({ values, fatherKey: props.fatherKey, listIndex })
      }

    const LocalRenderGrid = ({ item, index }) => {
        return (
            <RenderField
                {...item}
                key={item.key}
                fieldKey={item.fieldKey}
                value={values[item.fieldKey]}
                fatherValue={values[localToString(item.father_id)]}
                placeholder={item.placeholder}
                error={touched[item.fieldKey] && Boolean(errors[item.fieldKey])}
                helperText={touched[item.fieldKey] && errors[item.fieldKey]}
                onChange={setFieldValue}
                handleBlur={handleBlur}
            />
        )
    }

    return (
        <Dialog open={props.isVisible} onClose={props.onVisibleChanges}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
  
        </DialogActions>
      </Dialog>

    );
}

export default memo(ModalForm);
