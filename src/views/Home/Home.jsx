import { Fragment, useEffect, useState, useRef } from "react";
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
  AnalyticItemIcon,
  AnalyticItem,
  VideoOverlay
} from "./styles/HomeStyles";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import Footer from "./components/Footer/Footer";
import { useHistory } from "react-router";
import { useQuery } from "react-query";
import { getVideoDataFromWordpress, getHomeDataFromWordpress, getHomeMetricsData } from "../../api/Home";
import { getAllServices } from "../../api/ListOfServicesPerCategory";
import LayoutFooter from '../../components/Footer/Footer';
import { SmallHeightDivider } from "../../theme/Styles";
import CenterLoading from "../../components/CenterLoading/CenterLoading";
import WebIcon from '../../assets/icons/WebIcon.png'
import ValidUserIcon from '../../assets/icons/ValidUserIcon.png'
import CertifiedIcon from '../../assets/icons/CertifiedIcon.png'


function Home() {

  const history = useHistory();

  const [showVideoOverlay, setShowVideoOverlay] = useState(true);
  const servicesRef = useRef(null);

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

  const handleShowVideoOverlay = () => {
    setShowVideoOverlay(false);
  }

  return (
    <Container>
      <GobMessage />
      <Header servicesRef={servicesRef}/>
      <HomeContainer image={homeContent.image_url}>
        <HomeCenterContent>
          <Title>UNIDAD CENTRAL DE TRÀMITES TURISTICOS</Title>
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
          <AnalyticItem>
            <AnalyticItemIcon>
              <img src={WebIcon} />
            </AnalyticItemIcon>
            <Title>+{homeMetricsData.requests}</Title>
            <SubTitle>Solicitudes realizadas</SubTitle>
          </AnalyticItem>
          <AnalyticItem>
            <AnalyticItemIcon>
              <img src={ValidUserIcon} />
            </AnalyticItemIcon>
            <Title>+{homeMetricsData.citizens}</Title>
            <SubTitle>Usuarios registrados</SubTitle>
          </AnalyticItem>
          <AnalyticItem>
            <AnalyticItemIcon>
              <img src={CertifiedIcon} />
            </AnalyticItemIcon>
            <Title>+5</Title>
            <SubTitle>Busquedas realizadas</SubTitle>
          </AnalyticItem>
        </AnalyticsContainer>
      </MediumContainer>

      <Container
        style={{
          backgroundColor: '#EEEEEE',
          minHeight: "80vh",
          justifyContent: "center",
        }}
      >
        <CenterContainer ref={servicesRef}>
          <SearcherTitle>Trámites que ofrece la UCTT</SearcherTitle>
          <SearcherSubTitle >
            Nuestras direcciones te ofrecen el servicio integrado para gestionar la inversión turística. Desde el análisis del suelo, obtención de incentivos y su licencia de operación.
          </SearcherSubTitle>
          <div style={{ height: "60px" }} />
          <CardsContainer>
            {
              listOfServices.map((direction, index) => (
                <Fragment>
                  <ServiceCard
                    cardNumber={index}
                    title={direction.name}
                    bodyText={direction.description}
                    onRequestPress={() => history.push(`/app/listOfServices/${direction.id}`)}
                  />
                  <CardsDivider />
                </Fragment>
              ))
            }
            <ServiceCard
              cardNumber={3}
              title={"Sistema de Seguimiento a la Inversión Turística"}
              bodyText={"En este sistema se registra la inversión mensual de los proyectos, la cual le permite enviar los listados de exoneraciones para su aprobación."}
              requestCustomTitle="VER SISTEMA"
              onRequestPress={() => window.open("https://sit.mitur.gob.do/", '_blank').focus()}
            />
          </CardsContainer>
        </CenterContainer>

        <div style={{ height: "30px" }} />
      </Container>

      <ContainerVideo>
        {
          showVideoOverlay ?
            <VideoOverlay display={showVideoOverlay ? 'flex' : 'none'} onClick={handleShowVideoOverlay} />
            :
            <iframe
              width='100%'
              style={{ border: 0, height: '100vh' }}
              frameborder="0"
              allow="autoplay"
              encrypted-media
              allowfullscreen
              loading='lazy'
              src={`${videoContent?.video_url}?autoplay=1&loop=1`} />
        }
      </ContainerVideo>
      <Footer FooterRoutes={FooterRoutes} />
      <LayoutFooter />
    </Container>
  );
}

export default Home;
