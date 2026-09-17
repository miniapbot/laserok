import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { haptic } from "@/services/platformApi";
import { formatPrice } from "@/helpers/format";
import Button from "@/components/ui/Button";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const addToCart = useCartStore((s) => s.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products?.find((p) => p.id === Number(id));

  if (isLoading) {
    return <div className="text-center py-16 text-slate-500 px-4">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🔍</div>
        <div className="text-slate-500 mb-4">Product not found</div>
        <Button type="button" onClick={() => navigate("/")}>Back to catalog</Button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];
  const hasMultipleImages = images.length > 1;

  const hasDiscount = product.oldPrice !== undefined && product.oldPrice > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.oldPrice!) * 100) : 0;

  const handleAddToCart = () => {
    haptic.success();
    addToCart({ id: product.id, title: product.name, price: product.price, image: product.images[0] ?? "" });
  };

  const handlePrev = () => {
    haptic.selection();
    setActiveImage((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const handleNext = () => {
    haptic.selection();
    setActiveImage((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  return (
    <div className="w-full px-4 py-4">
      <button type="button" onClick={() => navigate("/")} className="mb-4 text-slate-500 hover:text-slate-900 text-sm">← Back to catalog</button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="aspect-square bg-slate-100 relative flex items-center justify-center overflow-hidden">
          {images.length > 0 ? (
            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">📦</span>
          )}

          {hasDiscount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">−{discountPercent}%</span>
          )}

          {hasMultipleImages && (
            <>
              <button type="button" onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-xl text-slate-700 transition-colors" aria-label="Previous">‹</button>
              <button type="button" onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-xl text-slate-700 transition-colors" aria-label="Next">›</button>

              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {images.map((_, idx) => (
                  <button key={idx} type="button" onClick={() => { haptic.selection(); setActiveImage(idx); }} className={"w-2 h-2 rounded-full transition-colors " + (idx === activeImage ? "bg-white" : "bg-white/50")} aria-label={"Image " + (idx + 1)} />
                ))}
              </div>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((url, idx) => (
              <button key={idx} type="button" onClick={() => { haptic.selection(); setActiveImage(idx); }} className={"w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-colors " + (idx === activeImage ? "border-blue-600" : "border-transparent")}>
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-4">
          <div className="text-xs text-slate-500 mb-2">{product.sku}</div>
          <h1 className="text-xl font-bold text-slate-900 mb-3">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-3 flex-wrap">
            <span className="text-2xl font-bold text-slate-900">{formatPrice(product.price)}</span>
            {hasDiscount && <span className="text-base text-slate-400 line-through">{formatPrice(product.oldPrice!)}</span>}
          </div>

          <div className="text-sm mb-4">
            {product.stock > 0 ? <span className="text-green-600">✓ In stock ({product.stock} pcs.)</span> : <span className="text-red-500">✗ Out of stock</span>}
          </div>

          {product.description && (
            <div className="mb-4">
              <h2 className="font-semibold text-slate-900 mb-1">Description</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {Object.keys(product.attributes).length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold text-slate-900 mb-2">Specifications</h2>
              <div className="space-y-1 text-sm">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-3">
                    <span className="text-slate-500">{key}</span>
                    <span className="text-slate-900 font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.stock > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold text-slate-900 mb-2">Quantity</h2>
              <div className="inline-flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                <button type="button" onClick={() => { haptic.selection(); setQuantity((q) => Math.max(1, q - 1)); }} className="w-10 h-10 rounded-lg bg-white font-bold text-slate-700" aria-label="Decrease">−</button>
                <span className="text-lg font-medium w-10 text-center">{quantity}</span>
                <button type="button" onClick={() => { haptic.selection(); setQuantity((q) => Math.min(product.stock, q + 1)); }} className="w-10 h-10 rounded-lg bg-white font-bold text-slate-700" aria-label="Increase">+</button>
              </div>
            </div>
          )}

          <Button type="button" disabled={product.stock === 0} onClick={handleAddToCart} className="w-full py-3 text-base">
            Add to cart — {formatPrice(product.price * quantity)}
          </Button>
        </div>
      </div>
    </div>
  );
}
