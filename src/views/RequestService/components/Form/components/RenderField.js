import React from 'react';
import { FIELD_TYPES, MASK_TYPE } from '../FormConstants';
import { Grid } from '@mui/material';
import Select from '../../../../../components/Select/Select';
import TextField from '../../../../../components/TextField/TextField';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import { SubTitle, Title } from '../../../../../theme/Styles';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import TimePicker from '../../../../../components/TimePicker/TimePicker';
import UploadFile from '../../../../../components/UploadFile/UploadFile';
import { localToArray } from '../../../../../utilities/functions/ArrayUtil';
import { localToString } from '../../../../../utilities/functions/StringUtil';
import { safeValExtraction } from '../../../../../utilities/functions/ObjectUtil';

const RenderField = (props) => {

  const LocalOnChange = (val) => {
    //call rule change
    if (props.type == FIELD_TYPES.select && typeof props.changeRule == 'function' && localToString(val.target.value).length > 0) {
      props.changeRule(localToString(localToArray(props.data).find(item => item.value == val.target.value).rule))
      //TODO add another validation for radioGroup like for select
    } else if (props.type == FIELD_TYPES.radioGroup && typeof props.changeRule == 'function' && localToString(val.target.value).length > 0) {
      props.changeRule(localToString(localToArray(props.data).find(item => item.value == val.target.value).rule))
    }
    //change val
    if (typeof props.onChange == 'function') {
      props.onChange(props.fieldKey, val.target.value);
    }
  }

  const childrenDataFilter = (arr, fatherKey, fatherVal) => {
    if (localToArray(arr).length === 0 || !fatherKey) {
      return arr
    }

    return localToArray(arr).filter(item => item.father == fatherVal)
  }

  const Field = () => {
    if (props.hidden) {
      return null
    }

    switch (props.type) {
      case FIELD_TYPES.radioGroup:
        return (
          <RadioButtonGroup
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            options={props.data}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.select:
      /*  console.log(
          props.data,
          props.father_id,
          safeValExtraction(props.fatherValue),
          childrenDataFilter(
            props.data,
            props.father_id,
            safeValExtraction(props.fatherValue)
          )

        )*/
        return (
          <Select
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            data={
              childrenDataFilter(
                props.data,
                props.father_id,
                props.fatherValue
              )
            }
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.text:
        if (localToString(props.Mask).length > 0) {
          return (
            <TextField
              id={props.fieldKey}
              title={props.label}
              value={props.value}
              mask={localToString(MASK_TYPE[props.Mask || ''])}
              useMaskPresets={true}
              unMaskedValue={true} //RETURN VALUE WITHOUT MASK 
              onChange={LocalOnChange}
              onBlur={props.handleBlur?.(props.fieldKey)}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.placeholder}
              disabled={!props.enabled}
              required={props.required}
              multiline={props.multiline}
            />
          )
        }
        return (
          <TextField
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            // mask={props.mask}
            // unMaskedValue={true} //RETURN VALUE WITHOUT MASK 
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
            multiline={props.multiline}
          />
        )
      case FIELD_TYPES.date:
        return (
          <DatePicker
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.time:
        return (
          <TimePicker
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.file:
        return (
          <UploadFile
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.header:
        if (props.subtype === 'h1') {
          return (
            <Title id={props.fieldKey}>
              {props.label}
            </Title>
          )
        } else {
          return (
            <SubTitle id={props.fieldKey}>
              {props.label}
            </SubTitle>
          )
        }

      default:
        return null
    }
  }
  return (

    props.type === 'header' ?
      <Grid item xs={12} sm={12} md={12}>
        {Field()}
      </Grid>
      :
      props.hidden == true ?
        null
        :
        <Grid item xs={3} sm={6} md={6}>
          {Field()}
        </Grid>

  )
}

export default React.memo(RenderField)