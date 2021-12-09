import { useEffect, useState } from "react";
import GobMessage from "../../components/GobMessage/GobMessage";
import Header from "./components/Header/Header";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import COLORS from "../../theme/Colors";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  slideImages,
  servicesListBackgroundImage,
  firstSelectorData,
  secondarySelectorData,
  tertiarySelectorData,
  quaternarySelectorData,
  ListServices,
  moreInformationBackgroundImage,
  FooterRoutes,
} from "./HomeConstants";
import {
  Container,
  ContainerBackground,
  MediumContainer,
  HomeTextContainer,
  HomeTitle,
  HomeSubTitle,
  DarkOverlay,
  Title,
  SearcherSubTitle,
  SubTitle,
  AnalyticsContainer,
  SelectorsSearcherContainer,
  SearchTextInput,
  SearchSelect,
  ServicesListContainer,
  ServicesTitle,
  ServicesSubtitle,
  CenterContainer,
  HomeContainer,
  DefaultButton,
  SearcherContainer,
  SelectorContainer,
  SearcherTitle,
  StyledDescriptionIcon,
  StyledPersonAddIcon,
  StyledSearchIcon,
  StyledSearchIconForSearcher,
  CardsContainer,
  CardsDivider,
  Section,
  SubtitleTest,
} from "./styles/HomeStyles";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import Footer from "./components/Footer/Footer";
import { useHistory } from "react-router";
import { SmallHeightDivider, StyledButton } from "../../theme/Styles";

import wpCall from "../../services/WpServerCall";

import { CarouselBootstrap } from "./components/carrosuel/CarouselBootstrap";

//import parse from 'html-react-parser';

function Home() {
  const minServicesBreakPoint = useMediaQuery("(min-width:830px)");
  const history = useHistory();

  const [wordpressContent, setWordpressContent] = useState([]);

  const getAndSetAllWordPressContent = async () => {
    let data = await wpCall().get("/sliders/v1/sliders");

    const datos = data.data.map(({ content, date, image, title }) => {
      return { content, date, image, title };
    });
    setWordpressContent(datos);
  };

  useEffect(() => {
    getAndSetAllWordPressContent();
  }, []);

  return (
    <Container>
      <GobMessage />

      <Header />

      <CarouselBootstrap datos={wordpressContent}></CarouselBootstrap>

      <MediumContainer style={{ backgroundColor: COLORS.secondary }}>
        <AnalyticsContainer>
          <div>
            <StyledDescriptionIcon />
            <Title>+304%</Title>
            <SubTitle>Solicitudes de licencias</SubTitle>
          </div>
          <div>
            <StyledPersonAddIcon />
            <Title>+304%</Title>
            <SubTitle>Usuarios registrados</SubTitle>
          </div>
          <div>
            <StyledSearchIcon />
            <Title>+304%</Title>
            <SubTitle>Busquedas realizadas</SubTitle>
          </div>
        </AnalyticsContainer>
      </MediumContainer>

      <MediumContainer style={{ backgroundColor: COLORS.white }}>
        <SearcherContainer>
          <SearcherSubTitle>
            Buscar por término o nombre del servicio
          </SearcherSubTitle>
          <SearchTextInput
            placeholder="Escriba aquí para realizar su búsqueda "
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StyledSearchIconForSearcher />
                </InputAdornment>
              ),
            }}
            input
          />
        </SearcherContainer>
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
            LISTADO DE SERVICIOS POR SUB-SECTOR
          </SearcherSubTitle>
          <SearcherTitle>Usa nuestro buscador avanzado</SearcherTitle>

          <div style={{ height: "60px" }} />
          <CardsContainer>
            <ServiceCard
              title="CONFOTUR"
              bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
              onRequestPress={() => history.push("/app/listOfServices/1")}
            />
            <CardsDivider />
            <ServiceCard
              title="EMPRESAS Y SERVICIOS"
              bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
              onRequestPress={() => history.push("/app/listOfServices/2")}
            />
            <CardsDivider />
            <ServiceCard
              title="DDP"
              bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
              onRequestPress={() => history.push("/app/listOfServices/3")}
            />
          </CardsContainer>
        </CenterContainer>

        <div style={{ height: "30px" }} />
      </Container>

      <ContainerBackground
        style={{
          backgroundImage: `url(${moreInformationBackgroundImage})`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "80px",
            alignContent: "left",
            alignItems: "center",
          }}
        >
          <ServicesSubtitle
            style={{
              margin: "10px",
              fontFamily: "Nunito Sans",
            }}
          >
            TRABAJANDO PARA TI
          </ServicesSubtitle>
          <ServicesTitle
            style={{
              margin: "10px",
              fontFamily: "Fira Sans",
            }}
          >
            Lorem Ipsum
          </ServicesTitle>
          <DefaultButton> SABER MÁS </DefaultButton>
        </div>
      </ContainerBackground>

      <Footer FooterRoutes={FooterRoutes} />
    </Container>
  );
}

export default Home;
