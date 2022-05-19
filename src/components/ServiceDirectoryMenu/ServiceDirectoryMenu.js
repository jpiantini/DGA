import { memo } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { getAllServices } from '../../api/ListOfServicesPerCategory';
import { capitalizeFirstLetter } from '../../utilities/functions/StringUtil';
import {
    Container,
    LinkText,
    Subtitle,
    Title,
    MinDivider
} from './styles/ServiceDirectoryMenuStyles';

function ServiceDirectoryMenu() {
    const history = useHistory();

    const { data: listOfServices,isLoading } = useQuery(['listOfServices'], () => getAllServices())
    if(isLoading) return null;
    return (
        <Container >
            <div style={{ width: '80%', alignSelf: 'center', marginTop: '30px' }}>
                <Title>TRAMITES</Title>
                <MinDivider />
                {
                    listOfServices.map((item) => (
                        <div key={item.id} style={{ marginTop: '10px', width: '100%' }}>
                            <Subtitle onClick={() => history.push(`/app/listOfServices/${item.id}`)}>{item.name}</Subtitle>
                            {   //TODO CHANGE DE PARAM OF history.push below
                                item.services.map((services) => (
                                    <div key={services.id} style={{ width: '100%' }}>
                                        <LinkText title={capitalizeFirstLetter(services.name)}
                                            onClick={() => history.push(`/app/serviceDescription/${services.id}`)}>
                                            {capitalizeFirstLetter(services.name)}
                                        </LinkText>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }

            </div>

        </Container>
    );
}

export default memo(ServiceDirectoryMenu);
