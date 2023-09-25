import HomeButtton from '../../../components/Home-Button';
import LoginForm from '../../../components/Login-Form';

function LoginPage() {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen relative">
      <HomeButtton className="absolute top-0 left-0 mt-4 ml-4" />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
