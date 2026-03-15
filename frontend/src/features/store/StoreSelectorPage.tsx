import { useAuth } from "@/app/providers/auth";
import { Store as StoreIcon } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

interface LocationState {
  userId: string,
  stores: {
    storeId: string;
    storeName: string;  
  }[];
}

const StoreSelectorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, selectStore } = useAuth();

  const state: LocationState | null = location.state;

  if (isAuthenticated) {
    return <Navigate to={'/'}/>
  }

  if(!state || !state.stores) {
    return <Navigate to={'/signin'}/>
  }

  const stores = state.stores;

  const handleSelectStore = async (storeId: string) => {
    try {
      await selectStore(storeId, state.userId)
      navigate('/');
      toast.success('Wellcome back', {position: 'top-center'});
    } catch {
      navigate('/signin');
      toast.warning('Access denied.', {position: 'top-center'});
    } 
  };

return (
  stores.length === 0 ? (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center bg-slate-200">
      <h2 className="text-h4 font-semibold mb-2">
          No Stores Available
      </h2>

      <p className="text-small text-slate-500 max-w-sm">
          You currently don't have access to any store. 
      </p>
      <p className="text-small text-slate-500 max-w-sm">
          Please contact your administrator.
      </p>

      <button
        onClick={() => navigate("/signin")}
        className="cursor-pointer mt-6 px-5 py-2 rounded-md bg-neutral-900 text-white text-small font-medium hover:bg-neutral-800 transition"
      >
        Back to Sign In
      </button>
    </div>
  ) : (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-3xl">

        <div className="text-center mb-10">
          <h1 className="text-h2 font-bold">Select Store</h1>
          <p className="text-small text-slate-500 mt-2">
            Choose the store you want to manage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <button
              key={store.storeId}
              onClick={() => handleSelectStore(store.storeId)}
              className="cursor-pointer bg-white border border-slate-300 rounded-md p-4 flex flex-col transition hover:border-neutral-900 hover:bg-neutral-50 hover:shadow-sm active:scale-[0.99]"
            >
              <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center mb-4">
                <StoreIcon size={18} className="text-neutral-700" />
              </div>

              <p className="font-semibold text-body text-left">
                {store.storeName}
              </p>

              <p className="text-small text-slate-400 text-left mt-1">
                ID: {store.storeId.slice(-5)}
              </p>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
);
};

export default StoreSelectorPage;