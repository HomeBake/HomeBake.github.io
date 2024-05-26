import { Stack } from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { TValues } from './App';
import { InfoModal } from './info-modal/info-modal';
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

export const GoogleMaps = ({ authToken, filterValues }: TProps) => {
    const [activeMarker, setActiveMarker] = useState<TMarker>();
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
                    zoom={12}>
                    {dataSet?.map(item => (
                        <Marker
                            {...item}
                            onClick={() => {
                                setActiveMarker(item);
                            }}
                        />
                    ))}
                </GoogleMap>
            ) : null}
            <InfoModal
                isOpen={Boolean(activeMarker)}
                activeMarker={activeMarker}
                onClose={() => setActiveMarker(undefined)}
            />
        </Stack>
    );
};

export type TMarker = {
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
