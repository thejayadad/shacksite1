'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const useLoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (email, password) => {
    if (password === '' || email === '') {
      toast.error('Fill all fields!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    try {
      const res = await signIn('credentials', { email, password, redirect: false });

      console.log(res);

      if (res?.error === null) {
        router.push('/');
      } else {
        toast.error('Error occurred while logging in');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSubmit };
};

export default useLoginForm;
