import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandGithubFilled, IconBrandGoogle, IconRotate } from '@tabler/icons-react';
import React from 'react';

import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import FAKE_USER from '../pages/(auth)/login/fake';
import { LoginSchema } from '../pages/(auth)/login/validation';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

type FormData = z.infer<typeof LoginSchema>;
function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      remember: false,
    },
  });
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();
  const onSubmit = async (data: FormData) => {
    // TODO: Implement api ere
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = FAKE_USER.find((user) => user.email === data.email && user.password === data.password);
      if (!user) {
        form.setError('email', {
          type: 'manual',
          message: 'Email or password is incorrect',
        });
        return;
      }
      login(user);
      const from = searchParams.get('from') ?? '/';
      navigate(from);
      localStorage.setItem('user', JSON.stringify(user));
    }, 2000);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Email </FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Password </FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="*********" type="password" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <IconRotate className="w-5 h-5 mr-2 animate-spin" />}
            Login
          </Button>
          <div className="text-xs flex justify-between">
            <Link to="/register" className="text-primary">
              Register now
            </Link>
            <Link to="/forgot" className="text-primary">
              Forgot password ?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button disabled={isLoading} className="w-full bg-slate-800 hover:bg-slate-700">
            <IconBrandGithubFilled className="w-5 h-5 mr-2" />
            Github
          </Button>
          <Button disabled={isLoading} className="w-full bg-sky-800 hover:bg-sky-700">
            <IconBrandGoogle className="w-5 h-5 mr-2" />
            Google
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
