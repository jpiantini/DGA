import { useState, useLayoutEffect, useEffect } from 'react';
import {
  MediumHeightDivider,
  StyledButtonOutlined,
} from '../../theme/Styles';
import { useDispatch } from 'react-redux';
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
  ButtonsMenuContainer,
  Container,
} from './styles/GeneralQueriesStyles';
import { useFormik } from 'formik';
import { generalQueriesMockup, menuOptions } from './GeneralQueriesConstants';
import { ButtonGroup, Grid } from '@mui/material';
import { useQuery } from 'react-query'
import MapCard from './components/MapCard/MapCard';
import Fade from 'react-reveal/Fade';

function GeneralQueries() {

  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState(0)

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle('Consultas generales')); // TITLE OF SUBHEADER APP
  }, []);

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
              generalQueriesMockup.map((item) => (
                <Grid item sx={3} sm={4} md={4}>
                  <MapCard {...item} />
                </Grid>
              ))
            }
          </Grid>
          :
          <div >
            documentos
          </div>

      }
      <MediumHeightDivider />
    </Container>
  );
}

export default GeneralQueries;
