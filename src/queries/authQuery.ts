import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  loginAPI,
  logoutAPI,
  signupAPI,
  withdrawalAPI,
  getAuthId,
  getUserIdAPI,
} from '@/apis/auth';
import { LoginRequest, SignupRequest } from '@/types/request';
import { LoginResponse, SignupResponse } from '@/types/response';

export const useLoginMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError: (error: AxiosError) => void;
}) => {
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationKey: ['login'],
    mutationFn: (request: LoginRequest) => loginAPI(request),
    onSuccess: (data: LoginResponse) => {
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};

export const useLogoutMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: number) => void;
}) => {
  return useMutation<void, number, void>({
    mutationKey: ['logout'],
    mutationFn: logoutAPI,
    onSuccess,
    onError: (error: number) => {
      onError(error);
    },
  });
};

export const useSignupMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: number) => void;
}) => {
  return useMutation<SignupResponse, number, SignupRequest>({
    mutationKey: ['signup'],
    mutationFn: (request: SignupRequest) => signupAPI(request),
    onSuccess,
    onError: (error: number) => {
      onError(error);
    },
  });
};

export const useWithdrawalMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: number) => void;
}) => {
  return useMutation<void, number, void>({
    mutationFn: withdrawalAPI,
    onSuccess,
    onError: (error: number) => {
      onError(error);
    },
  });
};

export const useGetAuthId = () => {
  return useQuery({
    queryKey: ['auth-id'],
    queryFn: () => getAuthId(),
  });
};

export const useUserIdQuery = () => {
  return useQuery({
    queryKey: ['user-id'],
    queryFn: () => getUserIdAPI(),
  });
};
