import { Fragment, useEffect, useState } from "react";
import GobMessage from "../../components/GobMessage/GobMessage";
import Header from "./components/Header/Header";
import COLORS from "../../theme/Colors";
import InputAdornment from "@mui/material/InputAdornment";
import { Autocomplete } from "@mui/material";
import {
  ListServices,
  moreInformationBackgroundImage,
  FooterRoutes,
} from "./HomeConstants";
import {
  Container,
  ContainerVideo,
  MediumContainer,
  Title,
  SearcherSubTitle,
  SubTitle,
  AnalyticsContainer,
  SearchTextInput,
  WhiteTitle,
  WhiteSubtitle,
  CenterContainer,
  DefaultButton,
  SearcherContainer,
  SearcherTitle,
  StyledDescriptionIcon,
  StyledPersonAddIcon,
  StyledSearchIcon,
  StyledSearchIconForSearcher,
  CardsContainer,
  CardsDivider,
  HomeContainer,
  HomeCenterContent,
} from "./styles/HomeStyles";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import Footer from "./components/Footer/Footer";
import { useHistory } from "react-router";
import { useQuery } from "react-query";
import { getVideoDataFromWordpress, getHomeDataFromWordpress, getHomeMetricsData } from "../../api/Home";
import { getAllServices } from "../../api/ListOfServicesPerCategory";
import  LayoutFooter from '../../components/Footer/Footer';

import { SmallHeightDivider } from "../../theme/Styles";
import CenterLoading from "../../components/CenterLoading/CenterLoading";


function Home() {

  const history = useHistory();

  const { data: homeContent, isLoading: homeContentIsLoading } = useQuery(['homeData'], () => getHomeDataFromWordpress())
  const { data: videoContent, isLoading: videoContentIsLoading } = useQuery(['videoData'], () => getVideoDataFromWordpress())
  const { data: listOfServices, isLoading: listOfServicesIsLoading } = useQuery(['listOfServices'], () => getAllServices())
  const { data: homeMetricsData, isLoading: homeMetricsDataIsLoading } = useQuery(['homeMetricsData'], () => getHomeMetricsData())

  const goToSelectedService = (service) => {
    history.push(`/app/serviceDescription/${service.id}`)
  };

  if (homeContentIsLoading || videoContentIsLoading || listOfServicesIsLoading || homeMetricsDataIsLoading) return <CenterLoading />

  const ServicesForSearcher = [
    ...listOfServices[0].services,
    ...listOfServices[1].services,
    ...listOfServices[2].services
  ].map((item) => {
    return {
      id: item.id,
      title: item.name,
    }
  })

  return (
    <Container>
      <GobMessage />
      <Header />
      <HomeContainer image={homeContent.image_url}>
        <HomeCenterContent>
          <Title>UNIDAD CENTRAL DE TRAMITES TURISTICOS</Title>
          <Title>(UCTT)- MITUR</Title>
          <SmallHeightDivider />
          <SmallHeightDivider />
          <SearcherContainer>
            <Autocomplete
              options={ServicesForSearcher}
              getOptionLabel={(option) => option.title}
              autoHighlight
              freeSolo
              style={{ width: '100%' }}
              onChange={(e, newValue) => {
                goToSelectedService(newValue)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.defaultMuiPrevented = true;
                }
              }}


              renderInput={(params) =>
                <SearchTextInput
                  {...params}
                  fullWidth
                  placeholder="Buscar por término o nombre del servicio"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: 'new-password',
                    startAdornment: (
                      <InputAdornment position="start" >
                        <StyledSearchIconForSearcher />
                      </InputAdornment>
                    ),
                  }}
                />}
            />
          </SearcherContainer>

        </HomeCenterContent>

      </HomeContainer>
      <MediumContainer style={{ backgroundColor: COLORS.secondary }}>
        <AnalyticsContainer>
          <div>
            <StyledDescriptionIcon />
            <Title>+{homeMetricsData.requests}</Title>
            <SubTitle>Solicitudes realizadas</SubTitle>
          </div>
          <div>
            <StyledPersonAddIcon />
            <Title>+{homeMetricsData.citizens}</Title>
            <SubTitle>Usuarios registrados</SubTitle>
          </div>
          <div>
            <StyledSearchIcon />
            <Title>+5</Title>
            <SubTitle>Busquedas realizadas</SubTitle>
          </div>
        </AnalyticsContainer>
      </MediumContainer>

      <Container
        style={{
          backgroundColor: COLORS.snow,
          minHeight: "80vh",
          justifyContent: "center",
        }}
      >
        <CenterContainer>
          <SearcherSubTitle style={{ margin: 0 }}>
            LISTADO DE SERVICIOS POR DIRECCION
          </SearcherSubTitle>
          <SearcherTitle>Usa nuestro buscador avanzado</SearcherTitle>

          <div style={{ height: "60px" }} />
          <CardsContainer>
            {
              listOfServices.map((direction,index) => (
                <Fragment>
                  <ServiceCard
                    title={direction.name}
                    bodyText={direction.description}
                    onRequestPress={() => history.push(`/app/listOfServices/${direction.id}`)}
                  />
                  {
                    listOfServices.length === index +1 ?
                    null
                    :
                    <CardsDivider />
                  }
                </Fragment>
              ))
            }
          </CardsContainer>
        </CenterContainer>

        <div style={{ height: "30px" }} />
      </Container>

      <ContainerVideo>
        <iframe
          width='100%'
          height='700px'
          style={{ border: 0 }}
          allowfullscreen=''
          loading='lazy'
          src={videoContent?.video_url} />

      </ContainerVideo>
      <Footer FooterRoutes={FooterRoutes} />
      <LayoutFooter/>
    </Container>
  );
}

export default Home;
