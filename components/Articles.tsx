import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Container, Divider, Grid } from "@mui/material"
import styles from "../sass/Articles.module.scss"
import FullScreenDialog from "./FullScreenDialog"
import { IFullScreenDialogVariable, IArticle } from '../common'
import { AxiosProductInstance } from '../service';
import SkeletonLoading from './SkeletonLoading';

const Articles: React.FC = () => {
    const [textMoreInfo, setTextMoreInfo] = React.useState<IFullScreenDialogVariable>()
    const [textMoreInfoOpen, setTextMoreInfoOpen] = React.useState<boolean>(false)
    const [articles, setArticles] = React.useState<IArticle[]>([])

    React.useEffect(() => {
        (async () => {
            await AxiosProductInstance
                .get<IArticle[]>("fetchArticles")
                .then(({ data }) => setArticles(data))
        })()
    }, [])

    const ReadArticle = (id: number): void => {
        let findArticle = [...articles].find(item => item.id == id);
        setTextMoreInfo({ text: findArticle?.body, title: findArticle?.title })
        setTextMoreInfoOpen(true)
    }

    const ConditionalRendering = () => {
        if (articles.length == 0) {
            return <SkeletonLoading itemCount={3} lg={4} md={4} />
        }
        else {
            return articles?.map(({ id, date, body, title, img }, index) => {
                return <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={img}
                            alt={title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {title}
                            </Typography>
                            <Typography variant="caption" component="div" textAlign={"justify"} sx={{ mt: 2 }} lineHeight={2} className={styles.pragraphEffect}>
                                {body?.substring(0, 230)}
                            </Typography>

                            <Typography variant="caption" component="div" dir='ltr' color="red">
                                <Button variant='text' color='error' onClick={() => ReadArticle(id)}>
                                    خواندن مقاله
                                </Button>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            })
        }
    }

    return (
        <>
            <FullScreenDialog open={textMoreInfoOpen} text={textMoreInfo?.text} title={textMoreInfo?.title} handleClose={() => setTextMoreInfoOpen(false)} />
            <Container sx={{ mt: 10 }}>
                <Typography gutterBottom variant="h4" component="div">
                    مقالات
                </Typography>
                <Divider />
                <Grid container sx={{ mt: 4 }} spacing={2}>
                    {
                        ConditionalRendering()
                    }
                </Grid>
            </Container>
        </>
    );
}
export default Articles;

