import { Modal, Stack, Typography } from '@mui/material';

import { TMarker } from '../google-maps';

type TProps = {
    isOpen: boolean;
    activeMarker?: TMarker;
    onClose: () => void;
};

export const InfoModal = ({ isOpen, activeMarker, onClose }: TProps) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Stack
                position="absolute"
                top="50%"
                left="50%"
                sx={{ transform: 'translate(-50%, -50%)' }}
                justifyContent="center"
                alignItems="center">
                <Stack
                    padding="16px"
                    borderRadius="20px"
                    sx={{ background: 'white' }}
                    height="200px"
                    width="400px">
                    <Typography variant="h6" color="black">
                        {activeMarker?.title}
                    </Typography>
                    <Typography variant="caption" color="black">
                        {activeMarker?.data.address}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        marginTop="8px">
                        <Typography variant="caption" color="black">
                            Conversion
                        </Typography>
                        <Typography variant="caption" color="black" width="50%">
                            {activeMarker?.data.conversion}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="black">
                            footage
                        </Typography>
                        <Typography variant="caption" color="black" width="50%">
                            {activeMarker?.data.footage}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="black">
                            receipt
                        </Typography>
                        <Typography variant="caption" color="black" width="50%">
                            {activeMarker?.data.receipt}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="black">
                            revenue
                        </Typography>
                        <Typography variant="caption" color="black" width="50%">
                            {activeMarker?.data.revenue}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    );
};
