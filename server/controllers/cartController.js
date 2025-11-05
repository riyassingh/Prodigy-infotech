import CartProduct from "../models/CartProductModel.js";
import User from "../models/Users.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    const user_id = req.user._id;

    let cartItem = await CartProduct.findOne({ product_id, user_id });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartProduct.create({ product_id, quantity, user_id });
    }

    // Ensure user's cart includes this cart item
    const user = await User.findById(user_id);
    const alreadyInCart = user.cart.some(
      (itemId) => itemId.toString() === cartItem._id.toString()
    );

    if (!alreadyInCart) {
      user.cart.push(cartItem._id);
      await user.save();
    }

    return res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    return res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Get all cart items for a user
export const getUserCart = async (req, res) => {
  try {
    const user_id = req.user._id;

    const cartItems = await CartProduct.find({ user_id }).populate({
      path: "product_id",
      select: "name price discount images brand",
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error in getUserCart:", error.message);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};


// Update quantity of a cart item
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedItem = await CartProduct.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    ).populate({
      path: "product_id",
      select: "name image oldPrice newPrice company",
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error in updateCartItem:", error.message);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await CartProduct.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { cart: id },
    });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removeCartItem:", error.message);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};
