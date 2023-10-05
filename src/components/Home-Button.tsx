import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button, ButtonProps } from './ui/button';

type Props = ButtonProps & {
  text?: string;
};

function HomeButtton({ className, text = 'Go back', ...props }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };
  return (
    <Button className={cn(className)} colors={'secondary'} onClick={onClick} size={'sm'} {...props}>
      <IconChevronLeft className="w-5 h-5 mr-2" />
      {text}
    </Button>
  );
}

export default HomeButtton;
