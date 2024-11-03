export type EditFormData = {
  nickname: string;
  introduction: string;
};

export type ReviewFormData = {
  score: 1 | 2 | 3 | 4 | 5 | null;
  text: string;
  images: string[];
};
