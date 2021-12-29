import { useEffect, useState } from "react";
import GobMessage from "../../components/GobMessage/GobMessage";
import Header from "./components/Header/Header";
import COLORS from "../../theme/Colors";
import InputAdornment from "@mui/material/InputAdornment";
import { Autocomplete, useMediaQuery } from "@mui/material";
import {
  ListServices,
  moreInformationBackgroundImage,
  FooterRoutes,
} from "./HomeConstants";
import {
  Container,
  ContainerBackground,
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
} from "./styles/HomeStyles";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import Footer from "./components/Footer/Footer";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import wpCall from "../../services/WpServerCall";
import { CarouselBootstrap } from "./components/carrosuel/CarouselBootstrap";


function Home() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authReducer);

  const [wordpressContent, setWordpressContent] = useState([]);

  const getAndSetAllWordPressContent = async () => {
    let data = await wpCall().get("/sliders/v1/sliders");

    const datos = data.data.map(({ content, date, image, title }) => {
      return { content, date, image, title };
    });
    setWordpressContent(datos);
  };

  
  const goToSelectedService = (service) => {
      history.push(`/app/serviceDescription/${service.id}`)
  };

  useEffect(() => {
    getAndSetAllWordPressContent();
  }, []);

  return (
    <Container>
      <GobMessage />

      <Header />

      <CarouselBootstrap data={wordpressContent}/>

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

          <Autocomplete
            options={ListServices}
            getOptionLabel={(option) => option.title}
            autoHighlight
            freeSolo
            style={{width:'100%'}}
            onChange={(e,newValue) => {
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
                placeholder="Escriba aquí para realizar su búsqueda "
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
              title="DPP"
              bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
              onRequestPress={() => history.push("/app/listOfServices/3")}
            />
          </CardsContainer>
        </CenterContainer>

        <div style={{ height: "30px" }} />
      </Container>

      <ContainerBackground image={moreInformationBackgroundImage}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "80px",
            alignContent: "left",
            alignItems: "center",
          }}
        >
          <WhiteSubtitle>
            TRABAJANDO PARA TI
          </WhiteSubtitle>
          <WhiteTitle>
            Lorem Ipsum
          </WhiteTitle>
          <DefaultButton> SABER MÁS </DefaultButton>
        </div>
      </ContainerBackground>

      <Footer FooterRoutes={FooterRoutes} />
    </Container>
  );
}

export default Home;
