import {memo} from 'react';
import { useHistory } from 'react-router';
import { capitalizeFirstLetter } from '../../utilities/functions/StringUtil';
import { MOCKUP_SERVICES } from './ServiceDirectoryMenuConstants';
import {
    Container,
    LinkText,
    Subtitle,
    Title,
    MinDivider
} from './styles/ServiceDirectoryMenuStyles';


function ServiceDirectoryMenu() {
    const history = useHistory();

    return (
        <Container >
            <div style={{ width: '80%', alignSelf: 'center', marginTop: '30px' }}>
                <Title>SERVICIOS</Title>
                <MinDivider />
                {
                    MOCKUP_SERVICES.map((item) => (
                        <div key={item.id} style={{ marginTop: '10px', width: '100%' }}>
                            <Subtitle onClick={() => history.push(`/app/listOfServices/${item.id}`)}>{item.title}</Subtitle>
                            {   //TODO CHANGE DE PARAM OF history.push below
                                item.subMenus.map((subItem) => (
                                    <div key={subItem.id} style={{ width: '100%' }}>
                                        <LinkText onClick={() => history.push('/app/serviceDescription/1')}>{capitalizeFirstLetter(subItem.title)}</LinkText>
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
