import { useAuth } from '@/app/providers/auth/useAuth';
import { LogOut } from 'lucide-react';

const UserProfile = () => {
    const { auth } = useAuth();

    if (!auth) {
        throw new Error();
    }

    return (
        <div className="border-t border-slate-300 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">
                            {auth.fullname}
                        </span>
                        <span className="text-xs text-slate-500">
                            {`@${auth.username}`}
                        </span>
                    </div>
                </div>
                <button className="hover:bg-slate-100 hover:text-slate-800 p-2 rounded-xs cursor-pointer duration-100 transition-colors ease-in-out text-slate-600">
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
