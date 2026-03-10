import { useAuth } from "@/app/providers/auth";
import { Button, FieldTitle, Input, Spinner } from "@/shared/components/ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

const LoginPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { login } = useAuth();


    const onSubmitAction = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await login(username, password);
            toast.success("wellcome back", {position: 'top-center'});
            navigate('/');
        }
        catch (error){
            
            if(error instanceof AxiosError && error.status === 401) {
                toast.info("invalid username and password", {position: 'top-center'});
                return;
            }

            toast.warning("Unexpected error occurred.", {position: 'top-center'});
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="bg-white p-10 rounded-sm space-y-6 w-md sm:border border-slate-300">
            <h1 className="text-h1 mb-2">Sindo MS</h1>
            <p className="text-small">Sign in to your account</p>
            <form className="space-y-4 mt-10" onSubmit={onSubmitAction}>
                <div className="space-y-3">
                    <FieldTitle>
                        Username
                    </FieldTitle>
                    <Input 
                        placeholder="Enter your username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                </div>
                <div className="space-y-3">
                    <FieldTitle>
                        Password
                    </FieldTitle>
                    <Input 
                        placeholder="Enter your password"
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </div>
                <Button 
                    className="w-full mt-4 cursor-pointer" 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ?  <>Processing <Spinner className="size-3"/></> : 'Sign In' }
                </Button>
            </form>
        </div>
    )
}

export default LoginPage