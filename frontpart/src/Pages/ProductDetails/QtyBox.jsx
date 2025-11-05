import React, { useState } from "react";

function QtyBox({ initialQty = 0, onChange }) {
  const [quantity, setQuantity] = useState(initialQty);

  const increaseQty = () => {
    setQuantity((prev) => {
      const newQty = prev + 1;
      onChange && onChange(newQty);
      return newQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prev) => {
      if (prev > 0) {
        const newQty = prev - 1;
        onChange && onChange(newQty);
        return newQty;
      }
      return prev;
    });
  };

  return (
    <div className="flex items-center space-x-2 border rounded-lg p-2 w-fit">
      <button 
        onClick={decreaseQty} 
        disabled={quantity <= 0} 
        className={`border px-3 py-1 rounded ${quantity <= 0 ? "opacity-50 cursor-pointer" : ""}`}
      >
        -
      </button>
      <span className="w-12 text-center">
        {quantity > 0 ? quantity : "Add"}
      </span>
      <button onClick={increaseQty} className="border px-3 py-1 rounded">+</button>
      <button className="border px-4 py-1 rounded bg-[#FF3D3D] text-white">Add to Cart</button>
    </div>
  );
}

export default QtyBox;
