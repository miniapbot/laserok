import { Routes, Route } from "react-router-dom";
import CatalogPage from "@/pages/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ThankYouPage from "@/pages/ThankYouPage";
import OrdersPage from "@/pages/OrdersPage";
import ContactsPage from "@/pages/ContactsPage";
import Header from "@/components/common/Header";
import { CartDrawer } from "@/components/cart";
import { useProductPageBackButton } from "@/hooks/useProductPageBackButton";
import { useMaxViewport } from "@/hooks/useMaxViewport";

export default function App() {
  useProductPageBackButton();
  useMaxViewport();

  return (
    <div className="min-h-screen bg-slate-100 w-full">
      <Header />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you/:orderId" element={<ThankYouPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      <CartDrawer />
    </div>
  );
}
