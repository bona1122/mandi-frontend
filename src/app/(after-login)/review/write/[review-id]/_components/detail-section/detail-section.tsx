import { Control, Controller } from 'react-hook-form';

import classNames from 'classnames/bind';

import CreatePostImageUploader from '@/app/(after-login)/community/_components/create-post-image-uploader';
import Textarea from '@/components/common/textarea';
import { REVIEW_TEXT_RULES } from '@/constants/form';
import { ReviewFormData } from '@/types/form';

import styles from './detail-section.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'detail-section';

interface DetailSectionProps {
  control: Control<ReviewFormData, any>;
}

const DetailSection = ({ control }: DetailSectionProps) => {
  return (
    <div className={cx(BLOCK)}>
      <div className={cx('title')}>
        <h2>We&apos;d love to hear more details!</h2>
        <span className={cx('optional')}>Optional</span>
      </div>
      <Controller
        name='images'
        control={control}
        render={({ field: { value, onChange } }) => (
          <CreatePostImageUploader
            images={value}
            onUpload={files => {
              const newImages = files.map(file => {
                const reader = new FileReader();
                return new Promise<string>(resolve => {
                  reader.onloadend = () => {
                    resolve(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                });
              });

              Promise.all(newImages).then(results => {
                onChange([...value, ...results]);
              });
            }}
            onDelete={index => {
              onChange(value.filter((_, i) => i !== index));
            }}
          />
        )}
      />
      <Controller
        name='text'
        control={control}
        rules={REVIEW_TEXT_RULES}
        render={({ field }) => (
          <Textarea
            style={{ height: '6rem' }}
            placeholder='Tell us about the atmosphere, difficulty, facilities, and more!'
            value={field.value}
            onChange={field.onChange}
            maxLength={700}
          />
        )}
      />
    </div>
  );
};

export default DetailSection;
