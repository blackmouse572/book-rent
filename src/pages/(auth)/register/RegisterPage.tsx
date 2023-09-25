import HomeButtton from '../../../components/Home-Button';
import RegisterForm from '../../../components/Register-Form';

function RegisterPage() {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen relative">
      <HomeButtton className="absolute top-0 left-0 mt-4 ml-4" />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
