import React from 'react'
import { Grid, Skeleton } from '@mui/material';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function SkeletonLoading({ itemCount }: { itemCount: number }) {
    const Rendering = () => {
        let items = []
        for (var i = 0; i < itemCount; i++) {
            items[i] =
                <Grid item lg={3} md={4} sm={6} xs={12} >
                    <Card>
                        <Skeleton variant="rectangular" height={250} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" sx={{ direction: "rtl" }} component="div" display={'flex'} justifyContent="space-between">
                                <Skeleton variant="rectangular" height={40} />
                            </Typography>
                            <Typography variant="h6" sx={{ direction: "rtl", pt: 2 }} >
                                <Skeleton variant="rectangular" height={40} />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Skeleton variant="rectangular" height={20} />
                        </CardActions>
                    </Card>
                </Grid>
        }

        return items;
    }
    return (
        <>
            {
                Rendering()
            }
        </>
    )
}

export default SkeletonLoading
