'use client';

import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useSignupMutation } from '@/queries/authQuery';

import Step1 from './_components/Step1';
import Step2 from './_components/Step2';
import Step3 from './_components/Step3';
import Step4 from './_components/Step4';
import Step5 from './_components/Step5';

const SignUp = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    description: '',
    difficultyLevel: 0,
    durationLevel: 0,
    environmentLevel: 0,
  });

  const { mutate: signup } = useSignupMutation({
    onSuccess: () => {
      router.push(`/welcome?nickname=${formData.nickname}`);
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleNext = (data: FieldValues) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (data: FieldValues) => {
    console.log(formData, data);
    signup({ token: session?.accessToken || '', ...formData, ...data });
  };

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <Step3 onNext={handleNext} onBack={handleBack} />}
      {step === 4 && <Step4 onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <Step5 onSubmit={handleSubmit} onBack={handleBack} />}
    </>
  );
};

export default SignUp;
