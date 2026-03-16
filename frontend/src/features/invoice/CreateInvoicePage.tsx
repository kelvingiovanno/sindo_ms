import { useState } from "react";
import { Trash } from "lucide-react";

type InvoiceItem = {
  id: string;
  product_id: string;
  name: string;
  quantity: number;
  price: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: "p1", name: "Engine Oil", price: 25 },
  { id: "p2", name: "Brake Pad", price: 50 },
  { id: "p3", name: "Air Filter", price: 15 },
  { id: "p4", name: "Spark Plug", price: 10 },
];

const CreateInvoicePage = () => {
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [note, setNote] = useState("");
  const [taxRate, setTaxRate] = useState(10);

  const [items, setItems] = useState<InvoiceItem[]>([]);

  const addProduct = (product: Product) => {
    const existing = items.find((i) => i.product_id === product.id);

    if (existing) {
      setItems(
        items.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: crypto.randomUUID(),
          product_id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
        },
      ]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const subTotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const tax = subTotal * (taxRate / 100);
  const total = subTotal + tax;

  const handleSubmit = () => {
    const payload = {
      customer_id: customerId,
      note,
      sub_total: subTotal,
      tax,
      total,
      status: "DRAFT",
      items,
    };

    console.log(payload);
  };

  return (
    <div className="p-4 pt-22 lg:p-6 space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Create Invoice</h1>
        <p className="text-sm text-gray-500">
          Create a new invoice by selecting products and customer
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT PRODUCT SEARCH */}
        <div className="col-span-12 lg:col-span-5 bg-white border rounded-xl p-5 space-y-4">

          <h2 className="font-semibold text-lg">Products</h2>

          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="space-y-2 max-h-[500px] overflow-y-auto">

            {products
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <button
                  key={product.id}
                  onClick={() => addProduct(product)}
                  className="w-full border rounded-lg px-4 py-3 text-left hover:bg-slate-100"
                >
                  <div className="flex justify-between">
                    <span>{product.name}</span>
                    <span>${product.price}</span>
                  </div>
                </button>
              ))}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-12 lg:col-span-7 space-y-6">

          {/* CUSTOMER */}
          <div className="bg-white border rounded-xl p-5 space-y-4">

            <h2 className="font-semibold">Customer</h2>

            <input
              placeholder="Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />

          </div>

          {/* ITEMS */}
          <div className="bg-white border rounded-xl">

            <div className="p-4 border-b font-semibold">
              Invoice Items
            </div>

            <div className="p-4 space-y-4">

              {items.length === 0 && (
                <p className="text-sm text-gray-500">
                  No items added
                </p>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-3 items-center"
                >

                  <div className="col-span-4">
                    {item.name}
                  </div>

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(item.id, Number(e.target.value))
                    }
                    className="col-span-2 border rounded px-2 py-1"
                  />

                  <div className="col-span-2">
                    ${item.price}
                  </div>

                  <div className="col-span-3 text-sm">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    <Trash size={18} />
                  </button>

                </div>
              ))}

            </div>
          </div>

          {/* SUMMARY */}
          <div className="flex justify-end">

            <div className="w-80 bg-white border rounded-xl p-5 space-y-3">

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <span>Tax (%)</span>

                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) =>
                    setTaxRate(Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
              </div>

              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

            </div>

          </div>

          {/* NOTE */}
          <div className="bg-white border rounded-xl p-5">
            <textarea
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg"
            >
              Create Invoice
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;