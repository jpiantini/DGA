import { useState } from 'react';
import GobMessage from '../../components/GobMessage/GobMessage';
import Header from './components/Header/Header';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import COLORS from '../../theme/Colors';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    slideImages,
    servicesListBackgroundImage,
    firstSelectorData,
    secondarySelectorData,
    tertiarySelectorData,
    quaternarySelectorData,
    ListServices,
    moreInformationBackgroundImage
} from './HomeConstants';
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
    SearcherTitle
} from './styles/HomeStyles';
import ServiceCard from './components/ServiceCard/ServiceCard';
import Footer from './components/Footer/Footer';
import { useHistory } from 'react-router';

function Home() {
    const minServicesBreakPoint = useMediaQuery('(min-width:830px)');
    const history = useHistory();
    return (
        <Container >
            <GobMessage />
            <HomeContainer style={{
                'backgroundImage': `url(${slideImages[2]})`,
            }} >
                <DarkOverlay>
                    <Header />
                    <HomeTextContainer>
                        <HomeSubTitle>LOREM IPSUM, CASUS AMER</HomeSubTitle>
                        <HomeTitle>Lorem ipsum,Cans amer dolor</HomeTitle>
                        <HomeSubTitle>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</HomeSubTitle>
                        <div style={{ height: '30px' }} />
                        <DefaultButton> SABER MÁS </DefaultButton>
                    </HomeTextContainer>
                </DarkOverlay>
            </HomeContainer>

            <MediumContainer style={{ backgroundColor: COLORS.secondary }}>
                <AnalyticsContainer>
                    <div>
                        <DescriptionIcon style={{ fontSize: '70px', color: COLORS.primary }} />
                        <Title>+304%</Title>
                        <SubTitle>Solicitudes de licencia</SubTitle>
                    </div>
                    <div>
                        <PersonAddIcon style={{ fontSize: '70px', color: COLORS.primary }} />
                        <Title>+304%</Title>
                        <SubTitle>Usuarios registrados</SubTitle>
                    </div>
                    <div>
                        <SearchIcon style={{ fontSize: '70px', color: COLORS.primary }} />
                        <Title>+304%</Title>
                        <SubTitle>Busquedas realizadas</SubTitle>
                    </div>
                </AnalyticsContainer>
            </MediumContainer>

            <MediumContainer style={{ backgroundColor: COLORS.white }}>
                <SearcherContainer>
                    <SearcherSubTitle>Buscar por término o nombre del servicio</SearcherSubTitle>
                    <SearchTextInput
                        placeholder="Escriba aquí para realizar su búsqueda "
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </SearcherContainer>
                <SelectorsSearcherContainer >
                    <SelectorContainer>
                        <SearcherSubTitle>Relacionado a:</SearcherSubTitle>
                        <SearchSelect
                            id="outlined-select-currency"
                            select
                            label="Elegir"
                        //   value={firstSelectorData}
                        //  onChange={handleChange}
                        >
                            {
                                firstSelectorData.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }

                        </SearchSelect>
                    </SelectorContainer>

                    <SelectorContainer>
                        <SearcherSubTitle>Subsector</SearcherSubTitle>
                        <SearchSelect
                            id="outlined-select-currency"
                            select
                            label="Elegir"
                        //   value={firstSelectorData}
                        //  onChange={handleChange}
                        >
                            {
                                secondarySelectorData.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }

                        </SearchSelect>
                    </SelectorContainer>


                    <SelectorContainer>
                        <SearcherSubTitle>Actividad</SearcherSubTitle>
                        <SearchSelect
                            id="outlined-select-currency"
                            select
                            label="Elegir"
                        //   value={firstSelectorData}
                        //  onChange={handleChange}
                        >
                            {
                                tertiarySelectorData.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }

                        </SearchSelect>
                    </SelectorContainer>


                    <SelectorContainer>
                        <SearcherSubTitle>Subactividad</SearcherSubTitle>
                        <SearchSelect
                            id="outlined-select-currency"
                            select
                            label="Elegir"
                        //   value={firstSelectorData}
                        //  onChange={handleChange}
                        >
                            {
                                quaternarySelectorData.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }

                        </SearchSelect>
                    </SelectorContainer>

                </SelectorsSearcherContainer>
            </MediumContainer>

            {/* <ServicesListContainer style={{
                'backgroundImage': `url(${servicesListBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <div>
                    <ServicesSubtitle>Listado de servicios por sub-sector</ServicesSubtitle>
                    <ServicesTitle>Usa nuestro buscador avanzado</ServicesTitle>
                </div>
                {
                    minServicesBreakPoint ?
                        <div>
                            <CenterContainer>
                                <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {
                                        ListServices.map((item) => (
                                            <Grid item >
                                                <ServiceCard itemId={item.id} {...item} OnViewInformationPress={() => history.push('/app/serviceDescription')} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </CenterContainer>
                        </div>
                        :
                        <div style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                            //PASS itemId as prop is REQUIRED for ScrollMenu work 
                            <ScrollMenu
                                LeftArrow={LeftArrow}
                                RightArrow={RightArrow}
                            >
                                {
                                    ListServices.map((item) => (
                                        <ServiceCard itemId={item.id} {...item} OnViewInformationPress={() => history.push('/app/serviceDescription')} />
                                    ))
                                }
                            </ScrollMenu>
                            <ServicesSubtitle>Deslice a la izquierda o derecha para ver los servicios</ServicesSubtitle>
                        </div>
                }
            </ServicesListContainer>
        
        */}
            <Container style={{
                backgroundColor: COLORS.snow,
                minHeight: '80vh',
                justifyContent: 'center'
            }}>
                <CenterContainer>
                    <SearcherSubTitle style={{ margin: 0 }}>LISTADO DE SERVICIOS POR SUB-SECTOR</SearcherSubTitle>
                    <SearcherTitle >Usa nuestro buscador avanzado</SearcherTitle>

                </CenterContainer>
                <div style={{ height: '30px' }} />
                <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item >
                        <ServiceCard title='CONFOTUR' bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut" />
                    </Grid>

                    <Grid item >
                        <ServiceCard title='EMPRESAS Y SERVICIOS' bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut" />
                    </Grid>

                    <Grid item >
                        <ServiceCard title='DDP' bodyText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut" />
                    </Grid>
                </Grid>
                <div style={{ height: '30px' }} />
            </Container>


            <ContainerBackground style={{
                'backgroundImage': `url(${moreInformationBackgroundImage})`,
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '80px', alignContent: 'left', alignItems: 'center' }}>

                    <ServicesSubtitle style={{
                        margin: '10px',
                        fontFamily: 'Nunito Sans',
                    }}>TRABAJANDO PARA TI</ServicesSubtitle>
                    <ServicesTitle style={{
                        margin: '10px',
                        fontFamily: 'Fira Sans',
                    }}>Lorem Ipsum</ServicesTitle>
                    <DefaultButton> SABER MÁS </DefaultButton>
                </div>
            </ContainerBackground>

            <Footer />
        </Container>
    );
}

export default Home;
