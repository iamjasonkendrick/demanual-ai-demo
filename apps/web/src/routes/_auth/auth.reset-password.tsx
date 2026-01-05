import { useState } from 'react';

import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, MailOpenIcon, ShieldCheckIcon } from 'lucide-react';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/_auth/auth/reset-password')({
  component: ResetPage,
});

const resetPasswordFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
});

function ResetPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const resetPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: resetPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className='flex min-h-svh w-full items-center justify-center py-10'>
      {isSubmitted ? (
        <div className='w-full max-w-xl space-y-6 px-4 md:space-y-7 md:px-8'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='h-1 w-8 bg-foreground' />
            <span className='flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-widest dark:text-chart-2'>
              <MailOpenIcon className='size-4' /> Account Recovery
            </span>
          </div>
          <h2 className='mb-4 font-bold font-display text-4xl text-foreground tracking-tighter lg:text-4xl xl:text-5xl'>
            Check your inbox
          </h2>
          <p className='font-normal text-foreground/70 text-sm leading-relaxed lg:text-base'>
            We've sent a password reset link to{' '}
            <span className='font-medium text-foreground'>
              {submittedEmail}
            </span>
            . Please check your inbox — and your spam or junk folder — to
            continue.
          </p>
          <Button className='mt-4 h-12 w-full text-base'>
            <Link to='/login' className='group flex items-center font-normal'>
              Back to login
              <ArrowRight className='ml-2 transition-transform group-hover:translate-x-1' />
            </Link>
          </Button>
          <p className='flex items-center justify-center text-foreground/70 text-xs lg:text-sm'>
            Didn't receive the email?
            <Button
              variant='link'
              className='-ml-2 cursor-pointer font-medium text-foreground text-xs underline hover:text-primary lg:text-sm'
            >
              Resend
            </Button>
          </p>
        </div>
      ) : (
        <div className='w-full max-w-xl space-y-6 px-4 md:space-y-7 md:px-8'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='h-1 w-8 bg-foreground' />
            <span className='flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-widest dark:text-chart-2'>
              <ShieldCheckIcon className='size-4' /> Account Recovery
            </span>
          </div>
          <h2 className='mb-4 font-bold font-display text-4xl text-foreground tracking-tighter lg:text-4xl xl:text-5xl'>
            Reset Password
          </h2>
          <p className='font-normal text-foreground/70 text-sm leading-relaxed lg:text-base'>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <form
            id='reset-password-form'
            onSubmit={(e) => {
              e.preventDefault();
              resetPasswordForm.handleSubmit();
            }}
          >
            <FieldGroup>
              <resetPasswordForm.Field
                name='email'
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className='space-y-1'>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='Enter your email'
                        autoComplete='email'
                        className='h-12 w-full text-base!'
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
          <Field orientation={'horizontal'}>
            <Button
              type='submit'
              form='reset-password-form'
              className='group h-12 w-full font-normal text-base'
            >
              Send reset link
              <ArrowRight className='ml-2 transition-transform group-hover:translate-x-1' />
            </Button>
          </Field>
        </div>
      )}
    </div>
  );
}
