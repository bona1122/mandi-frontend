export const NICKNAME_RULES = {
  required: 'Please enter your nickname.',
  pattern: {
    value: /^.{2,12}$/,
    message: 'Please enter between 2 and 12 characters.',
  },
  validate: {
    validNickname: (value: string) =>
      /^[a-zA-Z0-9]*$/.test(value) || 'You can only use letters and numbers.',
  },
};

export const BIO_RULES = {
  pattern: {
    value: /^.{0,80}$/,
    message: 'Please enter up to 80 characters.',
  },
};


export const REVIEW_TEXT_RULES = {
  pattern: {
    value: /^.{0,700}$/,
    message: 'Please enter up to 700 characters.',
  },
}