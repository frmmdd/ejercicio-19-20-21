import React, { useEffect, useState } from 'react'
import { getRandomJokes } from '../../services/axiosServices';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Card, Container } from '@mui/material';
import { padding } from '@mui/system';

export const ChuckComponent = () => {
    const [jokes, setJokes] = useState(null);
    const [like, setLike] = useState(0)
    const [dontlike, setDontLike] = useState(0)

    useEffect(() => {
        obtainJokes();
    }, []);

    const obtainJokes = () => {
        getRandomJokes()
            .then((response) => {
                if (response.status === 200) {
                    setJokes(response.data)
                }
            })
            .catch((error) => {
                alert(`Somethin went wrong: ${error}`);
            })
    }

    function handleCountLike() {
        setLike(like + 1);
    }

    function handleCountDontLike() {
        setDontLike(dontlike + 1)
    }

    return (
        <div>
            <h1>Chuck Norris Components</h1>


            {jokes !== null ?
                (
                    <Container maxWidth="sm">
                        <Card style={{ height: '300px', paddingInline: '40px' }}>
                            <p>{jokes?.value}</p>
                        </Card>
                    </Container>
                )
                : null}
            <div>
                <Container maxWidth="sm">
                    <p>Generate a new Jokes</p>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        < Button onClick={obtainJokes} >
                            Get Joke
                        </Button >
                        <Button onClick={handleCountLike}>
                            <ThumbUpAltIcon />
                        </Button>
                        <Button onClick={handleCountDontLike}>
                            <ThumbDownAltIcon />
                        </Button>
                    </ButtonGroup >
                </Container>
                <Container maxWidth="sm">
                    <p>Statistics of those who have liked and those who have not</p>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button>
                            <ThumbUpAltIcon />
                            <span>{like}</span>
                        </Button>
                        <Button>
                            <ThumbDownAltIcon />
                            <span>{dontlike}</span>
                        </Button>
                    </ButtonGroup >
                </Container>
            </div >
        </div >
    )
}