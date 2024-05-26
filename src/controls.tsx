import { Stack } from '@mui/material';
import { RangeSlider } from './range-slider';
import { TValues } from './App';

type TProps = {
    values: TValues
    setValues: (value: TValues) => void
}

export const Controls = ({ values, setValues }: TProps) => {
    return (
        <Stack gap="16px" width="100%">
            <RangeSlider
                title="conversion"
                leftValue={values.conversion[0]}
                rightValue={values.conversion[1]}
                min={0}
                max={1}
                step={0.1}
                value={values.conversion}
                onChange={(value: number[]) => setValues({...values, conversion: value})}
            />
            <RangeSlider
                title="footage"
                leftValue={values.footage[0]}
                rightValue={values.footage[1]}
                min={100}
                max={400}
                step={1}
                value={values.footage}
                onChange={(value: number[]) => setValues({...values, footage: value})}
            />
            <RangeSlider
                title="revenue"
                leftValue={values.revenue[0]}
                rightValue={values.revenue[1]}
                min={100000}
                max={1000000}
                step={1000}
                value={values.revenue}
                onChange={(value: number[]) => setValues({...values, revenue: value})}
            />
            <RangeSlider
                title="receipt"
                leftValue={values.receipt[0]}
                rightValue={values.receipt[1]}
                min={0}
                max={10000}
                step={100}
                value={values.receipt}
                onChange={(value: number[]) => setValues({...values, receipt: value})}
            />
        </Stack>
    );
};
