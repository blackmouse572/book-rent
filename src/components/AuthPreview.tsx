import { useAuth } from "@/hooks/useAuth";
import { cn, getLabelByFullname } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";
import { useNavigate } from "react-router-dom";

type Props = React.HTMLAttributes<HTMLDivElement>;

function AuthPreview({ className, ...prosp }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };
  const onLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className={cn("")} {...prosp}>
      {user ? (
        <div className="flex gap-3 items-center justify-center">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback>{getLabelByFullname(user.fullName)}</AvatarFallback>
          </Avatar>
          <div>
            <h6>{user.fullName}</h6>
            <p>{user.email}</p>
          </div>
          <Button
            variant={"ghost"}
            colors={"destructive"}
            className="w-fit px-2 hover:text-white"
            onClick={onLogout}
          >
            <Icons.signOut size={16} />
          </Button>
        </div>
      ) : (
        <Button onClick={onLogin}>Login</Button>
      )}
    </div>
  );
}

export default AuthPreview;
