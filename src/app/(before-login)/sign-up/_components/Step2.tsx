import { useForm, Controller, FieldValues } from 'react-hook-form';

import classNames from 'classnames/bind';

import Button from '@/components/common/button';
import Textarea from '@/components/common/textarea';
import Layout from '@/components/layout';

import styles from './common.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'step';

interface Step2Props {
  onNext: (data: { description: string }) => void;
  onBack: () => void;
}

const Step2 = ({ onNext, onBack }: Step2Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    onNext({ description: data.description });
  };

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} onBack={onBack}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(`${BLOCK}__container`)}
      >
        <div>
          <h1 className={cn(`${BLOCK}__title`)}>
            I’m curious about what kind of person you are!
          </h1>
          <Controller
            name='description'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Textarea
                {...field}
                label='One liner'
                placeholder='Introduce yourself in a short text (up to 80 characters, including spaces).'
                maxLength={80}
                error={errors.description?.message as string}
                style={{ height: '90px' }}
              />
            )}
          />
        </div>
        <div className={cn(`${BLOCK}__button-container`)}>
          <Button
            type='button'
            size='full'
            color='darkgray'
            onClick={() => onSubmit({ description: '' })}
            className={cn(`${BLOCK}__button`)}
          >
            Skip
          </Button>
          <Button
            type='submit'
            size='full'
            color='green'
            className={cn(`${BLOCK}__button`)}
          >
            Next
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Step2;
