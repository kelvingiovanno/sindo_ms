import { useAuth } from "@/app/providers/auth";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Button } from "@/shared/components/ui/button";

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
            const res = await login(username, password);
            navigate('/select-store', {
                state: res,
            });
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
        <div className="w-full h-screen sm:bg-slate-100 flex justify-center items-center">
            <div className="bg-white px-14 py-16 rounded-sm space-y-6 w-lg sm:border border-slate-300">
                <h1 className="text-h1 mb-2">Sindo MS</h1>
                <p className="text-small">Sign in to your account</p>
                <form className="space-y-4 mt-10" onSubmit={onSubmitAction}>
                    <Field>
                        <FieldLabel >
                            Username
                        </FieldLabel>
                        <Input 
                            placeholder="Enter your username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                        />
                    </Field>
                    <Field>
                        <FieldLabel>
                            Password
                        </FieldLabel>
                        <Input 
                            placeholder="Enter your password"
                            name="password" 
                            type="password" 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </Field>
                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="mt-6"
                    >
                        {isLoading ?  <>Processing <Spinner className="size-3"/></> : 'Sign In' }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage