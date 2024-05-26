import { Modal, Stack, Typography } from '@mui/material';
import {
    Data,
    GoogleMap,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { TValues } from './App';
const DATASET_QUERY =
    'https://mapsplatformdatasets.googleapis.com/download/v1/projects/apt-hold-418316/datasets/69083922-2c86-48ec-a9e7-dd0933264b9d:download?alt=media';

type TProps = {
    authToken?: string;
    filterValues: TValues;
};

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 54.72878752438382,
    lng: 20.54218582396851,
};

type TMap = google.maps.Map | null;

export const GoogleMaps = ({ authToken, filterValues }: TProps) => {
    const [map, setMap] = useState<TMap>(null);
    const [activeMarker, setActiveMarker] = useState<TMarker>();
    const onLoad = useCallback((map: TMap) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAArxU-z005Tf446aVA6KhjsiwOysaeGNQ',
    });
    const { data } = useQuery<TDatasetResponse>({
        retry: false,
        enabled: Boolean(authToken),
        queryKey: ['dataset'],
        queryFn: async () => {
            const response = await fetch(DATASET_QUERY, {
                headers: {
                    'X-Goog-User-Project': 'apt-hold-418316',
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.json();
        },
    });
    const dataSet = data?.features
        .filter(item => {
            if (
                item.properties.conversion > filterValues.conversion[1] ||
                item.properties.conversion < filterValues.conversion[0]
            ) {
                return false;
            }
            if (
                item.properties.footage > filterValues.footage[1] ||
                item.properties.footage < filterValues.footage[0]
            ) {
                return false;
            }
            if (
                item.properties.receipt > filterValues.receipt[1] ||
                item.properties.receipt < filterValues.receipt[0]
            ) {
                return false;
            }
            if (
                item.properties.revenue > filterValues.revenue[1] ||
                item.properties.revenue < filterValues.revenue[0]
            ) {
                return false;
            }
            return true;
        })
        .map<TMarker>((item, index) => ({
            position: {
                lng: item.geometry.coordinates[0],
                lat: item.geometry.coordinates[1],
            },
            title: item.properties.name,
            data: {
                id: index + 1,
                conversion: item.properties.conversion,
                address: item.properties.address,
                footage: item.properties.footage,
                revenue: item.properties.revenue,
                receipt: item.properties.receipt,
            },
        }));

    return (
        <Stack width="100%" height="100%">
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}>
                    {dataSet?.map(item => (
                        <Marker
                            {...item}
                            onClick={() => {
                              setActiveMarker(item)
                              
                            }}
                        />
                    ))}
                </GoogleMap>
            ) : null}
            <Modal
                open={Boolean(activeMarker)}
                onClose={() => setActiveMarker(undefined)}>
                <Stack
                position="absolute"
                    top="50%"
                    left="50%"
                    sx={{transform: 'translate(-50%, -50%)',}}
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
                        <Stack direction="row" justifyContent="space-between" marginTop="8px">
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
                            <Typography variant="caption" color="black"  width="50%">
                                {activeMarker?.data.footage}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" color="black">
                                receipt
                            </Typography>
                            <Typography variant="caption" color="black"  width="50%">
                                {activeMarker?.data.receipt}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" color="black">
                                revenue
                            </Typography>
                            <Typography variant="caption" color="black"  width="50%">
                                {activeMarker?.data.revenue}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        </Stack>
    );
};

type TMarker = {
    position: {
        lng: number;
        lat: number;
    };
    title: string;
    data: {
        id: number;
        conversion: number;
        address: string;
        footage: number;
        revenue: number;
        receipt: number;
    };
};

type TPlaceData = {
    type: 'Feature';
    properties: {
        name: string;
        address: string;
        conversion: number;
        footage: number;
        revenue: number;
        receipt: number;
    };
    geometry: {
        coordinates: [number, number];
        type: 'Point';
    };
};

type TDatasetResponse = {
    type: 'FeatureCollection';
    features: TPlaceData[];
};
