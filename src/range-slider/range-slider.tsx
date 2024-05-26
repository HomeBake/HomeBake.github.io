import { Slider, Stack, Typography } from '@mui/material';

type TProps = {
    title: string;
    leftValue: number;
    rightValue: number;
    min: number;
    max: number;
    step: number;
    value: number[];
    onChange: (value: number[]) => void;
}

export const RangeSlider = ({
    title,
    leftValue,
    rightValue,
    min,
    max,
    step,
    value,
    onChange,
}: TProps) => {
    return (
        <Stack>
            <Typography width="100%" variant="h6" textAlign="center">
                {title}
            </Typography>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Typography>{leftValue}</Typography>
                <Typography textAlign="end">{rightValue}</Typography>
            </Stack>
            <Stack>
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(_, newValue) => {
                        Array.isArray(newValue) && onChange(newValue);
                    }}
                    valueLabelDisplay="auto"
                />
            </Stack>
        </Stack>
    );
};
