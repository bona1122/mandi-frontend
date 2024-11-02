import { Controller, FieldValues, useForm } from 'react-hook-form';

import classNames from 'classnames/bind';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Layout from '@/components/layout';
import { useCheckNicknameMutation } from '@/queries/profileQuery';

import styles from './common.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'step';

interface Step1Props {
  onNext: (data: { nickname: string }) => void;
}

const Step1 = ({ onNext }: Step1Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const value = watch('nickname');

  const { mutate: checkNickname } = useCheckNicknameMutation({
    onSuccess: () => {
      onNext({ nickname: value });
    },
    onError: () => {
      setError('nickname', {
        message:
          'The nickname is already in use. Please choose a different one.',
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    checkNickname(data.nickname);
  };

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(`${BLOCK}__container`)}
      >
        <div>
          <h1 className={cn(`${BLOCK}__title`)}>
            What nickname
            <br />
            would you like to use?
          </h1>
          <Controller
            name='nickname'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please write within 2 to 10 characters.',
              },
              minLength: {
                value: 2,
                message: 'Nickname must be at least 2 characters long.',
              },
              maxLength: {
                value: 10,
                message: 'Nickname cannot exceed 10 characters.',
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'It contains characters that cannot be used.',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label='Nickname'
                placeholder='Please enter your nickname.'
                helper='You can use 2 to 12 characters, including letters and numbers.'
                error={errors.nickname?.message as string}
              />
            )}
          />
        </div>
        <Button
          type='submit'
          size='full'
          color='green'
          disabled={!value || !value.length}
          className={cn(`${BLOCK}__button`)}
        >
          Next
        </Button>
      </form>
    </Layout>
  );
};

export default Step1;
