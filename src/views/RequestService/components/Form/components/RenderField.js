import React from 'react';
import { FIELD_TYPES } from '../FormConstants';
import { Grid } from '@mui/material';
import Select from '../../../../../components/Select/Select';
import TextField from '../../../../../components/TextField/TextField';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import { SubTitle, Title } from '../../../../../theme/Styles';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import TimePicker from '../../../../../components/TimePicker/TimePicker';
import UploadFile from '../../../../../components/UploadFile/UploadFile';

const RenderField = (props) => {

  const LocalOnChange = (val) => {
    console.log(val)
    if (typeof props.onChange == 'function') {
      props.onChange(props.fieldKey, val.target.value);
    }
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
        return (
          <Select
            id={props.fieldKey}
            title={props.label}
            value={props.value}
            onChange={LocalOnChange}
            onBlur={props.handleBlur?.(props.fieldKey)}
            data={props.data}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={!props.enabled}
            required={props.required}
          />
        )
      case FIELD_TYPES.text:
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
        if(props.subtype === 'h1'){
          return (
            <Title id={props.fieldKey}>
              {props.label}
            </Title>
          )
        }else{
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