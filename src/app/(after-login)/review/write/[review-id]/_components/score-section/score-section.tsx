import classNames from 'classnames/bind';

import Star from '@/app/(after-login)/course/[course-id]/_components/star-raing/star';

import styles from './score-section.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'score-section';

interface ScoreSectionProps {
  score: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (score: 1 | 2 | 3 | 4 | 5) => void;
}

const ScoreSection = ({ score, onChange }: ScoreSectionProps) => {
  const handleScoreClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const stars = Array.from(e.currentTarget.children);
    const clickedStar = e.target as HTMLElement;
    const starElement = stars.find(star => star.contains(clickedStar));

    if (starElement) {
      const newScore = stars.indexOf(starElement) + 1;
      onChange(newScore as 1 | 2 | 3 | 4 | 5);
    }
  };

  return (
    <div className={cx(BLOCK)}>
      <div className={cx('title')}>
        <h2>How was your course exerience?</h2>
        <span className={cx('required')}>*</span>
      </div>
      <div className={cx('score')} onClick={handleScoreClick}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={40}
            type={score && score >= index + 1 ? 'filled' : 'empty'}
            backgroundColor='#EAEBEE'
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreSection;
