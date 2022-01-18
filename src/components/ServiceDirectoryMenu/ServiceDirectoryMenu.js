import {memo} from 'react';
import { MOCKUP_SERVICES } from './ServiceDirectoryMenuConstants';
import {
    Container,
    LinkText,
    Subtitle,
    Title,
    MinDivider
} from './styles/ServiceDirectoryMenuStyles';


function ServiceDirectoryMenu() {

    return (
        <Container >
            <div style={{ width: '80%', alignSelf: 'center', marginTop: '30px' }}>
                <Title>SERVICIOS</Title>
                <MinDivider />
                {
                    MOCKUP_SERVICES.map((item) => (
                        <div key={item.id} style={{ marginTop: '10px', width: '100%' }}>
                            <Subtitle >{item.title}</Subtitle>
                            {
                                item.subMenus.map((subItem) => (
                                    <div key={subItem.id} style={{ width: '100%' }}>
                                        <LinkText href='https://www.mitur.gob.do/politicas-de-privacidad/' >{subItem.title}</LinkText>
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
