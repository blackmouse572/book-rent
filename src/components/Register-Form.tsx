import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconReload } from '@tabler/icons-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { RegisterSchema } from '../pages/(auth)/register/validation';
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

type FormData = z.infer<typeof RegisterSchema>;
function RegisterForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        email: data.email,
        fullName: data.fullName,
        avatar: faker.image.avatar(),
        role: 'user',
        id: faker.database.mongodbObjectId(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Full Name </FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Full name" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <IconReload className="animate-spin w-5 h-5 mr-2" />}
          Register
        </Button>
        <p className="text-center text-sm">
          Alredy have an account?{' '}
          <Link to="/login" className="text-primary">
            Login now
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default RegisterForm;
