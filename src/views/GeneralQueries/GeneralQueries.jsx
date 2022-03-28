import { useState, useLayoutEffect, useEffect } from 'react';
import {
  MediumHeightDivider,
  SmallHeightDivider,
  StyledButtonOutlined,
  Title
} from '../../theme/Styles';
import { useDispatch } from 'react-redux';
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
  ButtonsMenuContainer,
  Container,
} from './styles/GeneralQueriesStyles';
import { useFormik } from 'formik';
import { generalQueriesDocumentsMockup, generalQueriesMapsMockup, menuOptions } from './GeneralQueriesConstants';
import { ButtonGroup, Grid } from '@mui/material';
import { useQuery } from 'react-query'
import MapCard from './components/MapCard/MapCard';
import Fade from 'react-reveal/Fade';
import Select from '../../components/Select/Select';
import TextField from '../../components/TextField/TextField';
import TextInformation from '../../components/TextInformation/TextInformation';
import FilePDF from './components/FilePDF/FilePDF';
import { getMapsDataFromWordpress } from '../../api/GeneralQueries';
import CenterLoading from '../../components/CenterLoading/CenterLoading';

function GeneralQueries() {

  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState(0)
  const [typeSelectedOption, setTypeSelectedOption] = useState(1);
  const [filterString, setFilterString] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const { data:mapsData, isLoading:mapsLoading } = useQuery(['mapsData'], () => getMapsDataFromWordpress())


  const selectOptions = generalQueriesDocumentsMockup.map((option) => {
    return {
      label: option.title,
      value: option.id,
      documents: option.documents
    }
  })

  const handleFilterByText = (filter) => {
    setFilterString(filter);
    const filteredData = selectOptions.find((option) => option.value == typeSelectedOption).documents
      .map((document) => {
        if (document.documentTitle.toLocaleLowerCase().includes(filter.toLowerCase())) {
          return document
        }
      })
    const dataWithUndefinedValuesRemoved = filteredData.filter((option) => option !== undefined);
    setFilteredItems(dataWithUndefinedValuesRemoved);
  }

  const handleTypeChange = (type) => {
    setFilterString('');
    setTypeSelectedOption(type);
    const filteredData = selectOptions.find((option) => option.value == type).documents
    setFilteredItems(filteredData);
  }

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    handleTypeChange(1);
    dispatch(UpdateAppSubHeaderTitle('Consultas generales')); // TITLE OF SUBHEADER APP
  }, []);

  if (mapsLoading) return <CenterLoading/>

  return (
    <Container>
      <ButtonsMenuContainer>
        <ButtonGroup size="large" >
          <StyledButtonOutlined active={activeMenu == menuOptions.maps} onClick={() => setActiveMenu(menuOptions.maps)}>
            Mapa de los Polos
          </StyledButtonOutlined>
          <StyledButtonOutlined active={activeMenu == menuOptions.documents} onClick={() => setActiveMenu(menuOptions.documents)}>
            Documentos
          </StyledButtonOutlined>
        </ButtonGroup>
      </ButtonsMenuContainer>

      <MediumHeightDivider />
      {
        activeMenu == menuOptions.maps ?
          <Grid
            alignItems='center'
            justifyContent='space-between'
            container
            direction='row'
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {
              mapsData.map((item) => (
                <Grid item sx={3} sm={4} md={4}>
                  <MapCard {...item} />
                </Grid>
              ))
            }
          </Grid>
          :
          <div >

            <Grid
              alignItems='center'
              justifyContent='space-evenly'
              container
              direction='row'
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 8, sm: 8, md: 12 }}
            >

              <Grid item xs={8} sm={8} md={3}>
                <Select
                  title="Tipo"
                  id='filterType'
                  data={selectOptions}
                  value={typeSelectedOption}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  disableEmptyValue
                  required
                />
              </Grid>

              <Grid item xs={8} sm={8} md={9}>
                <TextField
                  title='Nombre'
                  type='text'
                  id='requestID'
                  value={filterString}
                  onChange={(e) => handleFilterByText(e.target.value)}
                />
              </Grid>
            </Grid>
            <SmallHeightDivider />
            <SmallHeightDivider />
            <div>
              {filteredItems.length > 0 &&
                filteredItems.map((document, index) => (
                  <FilePDF key={index} title={document.documentTitle} url={document.documentURL} />
                ))
              }
            </div>
          </div>

      }
      <MediumHeightDivider />
    </Container>
  );
}

export default GeneralQueries;
