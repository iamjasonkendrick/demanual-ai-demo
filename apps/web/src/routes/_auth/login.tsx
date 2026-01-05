import { useState } from 'react';

import { useForm } from '@tanstack/react-form';
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import {
  ArrowRight,
  ArrowUpRight,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
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

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
  validateSearch: loginSearchSchema,
});

const loginFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
  rememberMe: z.boolean(),
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect: redirectUrl } = useSearch({ from: '/_auth/login' });
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
      <div className='w-full max-w-xl space-y-6 px-4 md:space-y-7 md:px-8'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='h-1 w-8 bg-foreground' />
          <span className='flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-widest dark:text-chart-2'>
            <KeyRoundIcon className='size-4' /> Business login
          </span>
        </div>
        <h2 className='mb-4 font-bold font-display text-4xl text-foreground tracking-tighter lg:text-4xl xl:text-5xl'>
          Welcome back.
        </h2>
        <p className='font-normal text-foreground/70 text-sm leading-relaxed lg:text-base'>
          Enter your credentials to access the Demanual AI workspace.
        </p>
        <form
          id='login-form'
          onSubmit={(e) => {
            e.preventDefault();
            loginForm.handleSubmit();
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
            <loginForm.Field
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
                      autoComplete='email'
                      className='h-12 w-full'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <loginForm.Field
              name='password'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    </div>
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
                        autoComplete='current-password'
                      />
                      <InputGroupAddon align='inline-end'>
                        <InputGroupButton
                          onClick={() => setShowPassword(!showPassword)}
                          type='button'
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
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <loginForm.Field
              name='rememberMe'
              children={(field) => {
                return (
                  <div className='flex h-6 items-center justify-between'>
                    <div className='group flex items-center gap-2'>
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked: boolean) =>
                          field.handleChange(checked)
                        }
                      />
                      <Label
                        htmlFor={field.name}
                        className='cursor-pointer font-normal'
                      >
                        Keep me signed in
                      </Label>
                    </div>
                    <Link
                      to='/auth/reset-password'
                      className='group flex items-center gap-1 text-sm hover:underline'
                    >
                      <span>Reset Password</span>
                      <ArrowUpRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </Link>
                  </div>
                );
              }}
            />
          </FieldGroup>
        </form>
        <Field orientation={'horizontal'}>
          <Button
            type='submit'
            form='login-form'
            className='group h-12 w-full font-normal text-base'
          >
            Sign In
            <ArrowRight className='ml-2 transition-transform group-hover:translate-x-1' />
          </Button>
        </Field>
        <p className='mb-6 text-center text-sm'>
          Don't have an account?{' '}
          <Link to='/signup' className='underline'>
            Sign Up
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
          onClick={handleGoogleSignIn}
          disabled={isGoogleSigningIn}
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
