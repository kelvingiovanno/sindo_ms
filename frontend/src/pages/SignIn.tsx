import { Input } from "@/components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"
import useAuth from "@/hooks/useAuth"

const SignIn = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    
    const navigate = useNavigate();
    const {login} = useAuth();


    const onSubmitAction = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await login(username, password);
            toast.success("wellcome back", {position: 'top-center'});
            navigate('/');
            setLoading(false);
        }
        catch (error){

            if(error instanceof AxiosError && error.status === 500) {
                toast.info("Unexpected error occurred.", {position: 'top-center'});
            }

            toast.info("invalid username and password", {position: 'top-center'});
            setLoading(false);
        }
    }


    return (
        <div className="bg-white p-10 rounded-sm space-y-6 w-md sm:border border-slate-300">
            <h1 className="text-h1 mb-2">Sindo MS</h1>
            <p className="text-small">Sign in to your account</p>
            <form className="space-y-4 mt-10" onSubmit={onSubmitAction}>
                <div className="space-y-3">
                    <Label className="text-small">Username</Label>
                    <Input 
                        placeholder="Enter your username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                </div>
                <div className="space-y-3">
                    <Label className="text-small">Password</Label>
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

export default SignIn