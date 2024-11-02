import { useForm, Controller, FieldValues } from 'react-hook-form';

import classNames from 'classnames/bind';

import IconBus from '@/assets/icon/icon-bus.svg';
import IconMountainSmall from '@/assets/icon/icon-mountain-small.svg';
import IconOcean from '@/assets/icon/icon-ocean.svg';
import Button from '@/components/common/button';
import Layout from '@/components/layout';
import { EnvironmentLevel } from '@/types/profile';

import styles from './common.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'step';

interface Step5Props {
  onSubmit: (data: { environmentLevel: EnvironmentLevel }) => void;
  onBack: () => void;
}

const Step5 = ({ onSubmit, onBack }: Step5Props) => {
  const { control, handleSubmit, watch } = useForm();
  const selected = watch('element');

  const handleFinalSubmit = (data: FieldValues) => {
    onSubmit({ environmentLevel: data.element });
  };

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} onBack={onBack}>
      <form
        onSubmit={handleSubmit(handleFinalSubmit)}
        className={cn(`${BLOCK}__container`)}
      >
        <div className={cn(`${BLOCK}__select-container`)}>
          <h1 className={cn(`${BLOCK}__title`)}>
            What is your preferred
            <br />
            tourist element?
          </h1>
          <Controller
            name='element'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <div className={cn(`${BLOCK}__select-container--controller`)}>
                <div
                  onClick={() => field.onChange(EnvironmentLevel.OCEAN)}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === EnvironmentLevel.OCEAN,
                  })}
                >
                  <IconOcean />
                  <p>I like the ocean</p>
                </div>
                <div
                  onClick={() => field.onChange(EnvironmentLevel.MOUNTAIN)}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === EnvironmentLevel.MOUNTAIN,
                  })}
                >
                  <IconMountainSmall />
                  <p>I like mountains</p>
                </div>
                <div
                  onClick={() => field.onChange(EnvironmentLevel.DOESNT_MATTER)}
                  className={cn(`${BLOCK}__select-container--item`, {
                    [`${BLOCK}__select-container--item--selected`]:
                      selected === EnvironmentLevel.DOESNT_MATTER,
                  })}
                >
                  <IconBus />
                  <p>It dosen’t matter</p>
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

export default Step5;
