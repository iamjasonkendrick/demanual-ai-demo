import { useState } from 'react';

import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  ArrowRight,
  EyeIcon,
  EyeOffIcon,
  LockOpenIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import z from 'zod';

import { GoogleIcon } from '@/components/icons/social';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_auth/signup/')({
  component: SignUpPage,
});

const signupFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(32, { message: 'Password can be at most 32 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one symbol (e.g., !@#$%^&*)',
    }),
  acceptedTerms: z.literal(true, {
    error: 'You must accept the terms and conditions',
  }),
});

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate();
  const signupForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      acceptedTerms: false as true | false,
    },
    validators: {
      onSubmit: signupFormSchema,
    },
    onSubmit: async (data) => {
      console.log(data.value);
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleSigningIn(true);
    } catch (error) {
      setErrors(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center py-10'>
      <div className='w-full max-w-xl space-y-5 px-4 md:space-y-7 md:px-8'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='h-1 w-8 bg-foreground' />
          <span className='flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-widest dark:text-chart-2'>
            <LockOpenIcon className='size-4' /> Business signup
          </span>
        </div>
        <h2 className='mb-4 font-bold font-display text-4xl text-foreground tracking-tighter lg:text-4xl xl:text-5xl'>
          Welcome to Demanual AI.
        </h2>
        <p className='font-normal text-foreground/70 text-sm leading-relaxed lg:text-base'>
          Enter your credentials to create a Demanual AI workspace.
        </p>
        <form
          id='signup-form'
          onSubmit={(e) => {
            e.preventDefault();
            signupForm.handleSubmit();
          }}
        >
          {errors && (
            <Alert
              variant='destructive'
              className='mb-4 flex items-center gap-4 border-2 border-destructive/40 bg-destructive/10'
            >
              <TriangleAlertIcon className='size-4 h-6 w-6 text-destructive' />
              <div className='flex flex-col'>
                <AlertTitle className='text-destructive'>{errors}</AlertTitle>
              </div>
            </Alert>
          )}
          <FieldGroup>
            <signupForm.Field
              name='email'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className='space-y-1'>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type='email'
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter your email'
                      autoComplete='off'
                      className='h-12 w-full'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <signupForm.Field
              name='password'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className='space-y-1'>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <InputGroup className='h-12 w-full'>
                      <InputGroupInput
                        id={field.name}
                        name={field.name}
                        type={showPassword ? 'text' : 'password'}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='Enter your password'
                        autoComplete='off'
                      />
                      <InputGroupAddon align='inline-end'>
                        <InputGroupButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon
                              strokeWidth={2}
                              className={`size-5 ${
                                isInvalid
                                  ? 'text-destructive'
                                  : 'text-foreground'
                              }`}
                            />
                          ) : (
                            <EyeIcon
                              strokeWidth={2}
                              className={`size-5 ${
                                isInvalid
                                  ? 'text-destructive'
                                  : 'text-foreground'
                              }`}
                            />
                          )}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError
                        errors={
                          field.state.meta.errors
                            ? [field.state.meta.errors[0]]
                            : []
                        }
                      />
                    )}
                  </Field>
                );
              }}
            />
            <signupForm.Field
              name='acceptedTerms'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className='group space-y-2'>
                    <div className='flex h-6 items-center gap-2'>
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked: boolean) =>
                          field.handleChange(checked as boolean)
                        }
                        aria-invalid={isInvalid}
                      />
                      <Label
                        htmlFor={field.name}
                        className='cursor-pointer font-normal text-sm'
                      >
                        I agree to the{' '}
                        <Link to='/signup' className='underline'>
                          terms
                        </Link>{' '}
                        and{' '}
                        <Link to='/signup' className='underline'>
                          privacy
                        </Link>
                      </Label>
                    </div>
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
            form='signup-form'
            className='group h-12 w-full font-normal text-base'
          >
            Create Account
            <ArrowRight className='ml-2 transition-transform group-hover:translate-x-1' />
          </Button>
        </Field>
        <p className='mb-6 text-center text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='underline'>
            Login
          </Link>
        </p>
        <div className='flex items-center gap-3 pt-1'>
          <hr className='grow border-0.5' />
          <span className='text-muted-foreground text-xs'>OR</span>
          <hr className='grow border-0.5' />
        </div>
        <Button
          variant={'secondary'}
          className='group h-12 w-full border font-normal text-base'
          disabled={isGoogleSigningIn}
          onClick={handleGoogleSignIn}
        >
          <div className='flex items-center justify-center gap-3'>
            <GoogleIcon className='h-5 w-5' />
            <span>
              {isGoogleSigningIn ? 'Signing in...' : 'Continue with Google'}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}
