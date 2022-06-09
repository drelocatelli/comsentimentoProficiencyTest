import { Container, Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";

export default function Home() {

    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Container style={{ margin: '25vh auto' }} maxW='800px' bg='blue.600' centerContent>
                <Box padding='4' maxW='md'>
                    There are many benefits to a joint design and development system. Not only
                    does it bring benefits to the design team, but it also brings benefits to
                    engineering teams. It makes sure that our experiences have a consistent look
                    and feel, not just in our design specs, but in production.
                </Box>
            </Container>
        </>
    )
}