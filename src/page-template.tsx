import { Grid, Stack } from '@mui/material';
import { ReactElement } from 'react';

type TProps = {
    leftSlot: ReactElement;
    rightSlot: ReactElement;
};

export const PageTemplate = ({ leftSlot, rightSlot }: TProps) => {
    return (
        <Grid container width="100dvw" height="100dvh">
            <Grid xs={2} item>
                <Stack
                    height="100%"
                    padding="60px 16px"
                    justifyContent="center"
                    alignItems="center">
                    {leftSlot}
                </Stack>
            </Grid>
            <Grid xs={10} item>
                {rightSlot}
            </Grid>
        </Grid>
    );
};
