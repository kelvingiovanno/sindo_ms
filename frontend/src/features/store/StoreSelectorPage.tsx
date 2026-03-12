import { Store } from "lucide-react";
import { useEffect } from "react";

const stores = [
  { id: 1, name: "Tokyo Sushi" },
  { id: 2, name: "Osaka Sushi" },
  { id: 3, name: "Kyoto Sushi" },
  { id: 3, name: "Kyoto Sushi" },
  { id: 3, name: "Kyoto Sushi" },
  { id: 3, name: "Kyoto Sushi" },
  { id: 3, name: "Kyoto Sushi" },
  { id: 3, name: "Kyoto Sushi" },
];

const StoreSelectorPage = () => {

  useEffect(() => {
    // fetch stores here
  }, []);

  const handleSelectStore = (storeId: number) => {
    console.log("Selected store:", storeId);
  };

  return (
    <>
        <div className="bg-white border border-neutral-200 rounded-xl px-12 py-14 w-full max-w-xl">

            <h1 className="text-h2 font-semibold text-neutral-900 text-center">
                Select Store
            </h1>

            <p className="text-small text-neutral-500 text-center mt-1 mb-6">
                Choose the store you want to manage
            </p>

            <div className="grid grid-cols-2 gap-4">
                {stores.map((store) => (
                    <button
                        key={store.id}
                        onClick={() => handleSelectStore(store.id)}
                        className="
                            border border-neutral-200
                            rounded-lg
                            cursor-pointer
                            p-4
                            text-left
                            transition
                            hover:border-neutral-900
                            hover:bg-neutral-50
                        "
                    >
                        <Store className="mb-2" opacity={0.7}/>
                        <p className="font-medium text-neutral-900">
                            {store.name}
                        </p>

                        <p className="text-xs text-neutral-400 mt-1">
                            Store ID: {store.id}
                        </p>
                    </button>
                ))}

            </div>

        </div>

    </>
  );
};

export default StoreSelectorPage;