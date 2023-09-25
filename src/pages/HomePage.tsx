import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

function HomePage() {
  return (
    <div className="container h-screen flex-col  flex gap-8 justify-center items-cente">
      <div className=" flex gap-3 justify-center items-center">
        <Button>Primary</Button>
        <Button colors="destructive">Destructive</Button>
        <Button colors="success">Success</Button>
        <Button colors="warning">Warning</Button>
      </div>
      <div className="max-w-sm flex gap-3 justify-center items-center mx-auto">
        <Label htmlFor="test">Test</Label>
        <Input id="test" />
      </div>
    </div>
  );
}

export default HomePage;
