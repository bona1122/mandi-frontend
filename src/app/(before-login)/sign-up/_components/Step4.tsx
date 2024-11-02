import { useForm, Controller, FieldValues } from 'react-hook-form';

import classNames from 'classnames/bind';

import Button from '@/components/common/button';
import Layout from '@/components/layout';
import { DurationLevel } from '@/types/profile';

import styles from './common.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'step';
interface Step4Props {
  onNext: (data: { durationLevel: DurationLevel }) => void;
  onBack: () => void;
}

const Step4 = ({ onNext, onBack }: Step4Props) => {
  const { control, handleSubmit, watch } = useForm();
  const selected = watch('time');

  const onSubmit = (data: FieldValues) => {
    onNext({ durationLevel: data.time });
  };

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} onBack={onBack}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(`${BLOCK}__container`)}
      >
        <div className={cn(`${BLOCK}__select-container`)}>
          <h1 className={cn(`${BLOCK}__title`)}>
            Which trekking distance
            <br />
            do you prefer?
          </h1>
          <Controller
            name='time'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <div className={cn(`${BLOCK}__select-container--controller`)}>
                <div
                  onClick={() =>
                    field.onChange(DurationLevel.LESS_THAN_3_HOURS)
                  }
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === DurationLevel.LESS_THAN_3_HOURS,
                  })}
                >
                  less than 3 hours
                </div>
                <div
                  onClick={() =>
                    field.onChange(DurationLevel.THREE_TO_SIX_HOURS)
                  }
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === DurationLevel.THREE_TO_SIX_HOURS,
                  })}
                >
                  3 to 6 hours
                </div>
                <div
                  onClick={() =>
                    field.onChange(DurationLevel.SIX_TO_NINE_HOURS)
                  }
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === DurationLevel.SIX_TO_NINE_HOURS,
                  })}
                >
                  6 to 9 hours
                </div>
                <div
                  onClick={() =>
                    field.onChange(DurationLevel.MORE_THAN_NINE_HOURS)
                  }
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === DurationLevel.MORE_THAN_NINE_HOURS,
                  })}
                >
                  more than 9 hours
                </div>
              </div>
            )}
          />
        </div>

        <Button
          type='submit'
          size='full'
          color='green'
          disabled={!selected}
          className={cn(`${BLOCK}__button`)}
        >
          Next
        </Button>
      </form>
    </Layout>
  );
};

export default Step4;
