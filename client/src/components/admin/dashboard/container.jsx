import './container.css';
import { Container } from './items';

export default function ContainerDashboard({ children, title }) {

    return (
        <Container className="container-fluid" dashboard={true}>
            <div style={{ float: 'right', marginRight: '30px' }}><h1>{title}</h1></div>
            <div style={{clear: 'both'}}></div>
            <div className="content">
                {children}
            </div>
        </Container>
    );

}