'use client'

import { Product } from '@/sanity.types'
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { useShallow } from 'zustand/shallow'
import { urlFor } from '@/sanity/lib/image'

type AddToCartButtonProps = {
    product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const { cartId, addItem, open } = useCartStore(
        useShallow((state) => ({
            cartId: state.cartId,
            addItem: state.addItem,
            open: state.open
        }))
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!product.title || product.price === undefined || !product.image) {
            return;
        }

        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 600));

        addItem({
            id: product._id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: urlFor(product.image).url()
        });

        try {
            const anyWindow = window as any;

            if (anyWindow.umami) {
                anyWindow.umami.track('add_to_cart', {
                    cartId: cartId,
                    productId: product._id,
                    productName: product.title,
                    price: product.price,
                    currency: 'USD'
                })
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
        open();
    }

    if(!product.price) {
        return null;
    }

  return (
    <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`
            w-full mt-6 bg-gradient-to-r from-red-500 to-red-600
            text-white py-4 rounded-full font-bold text-xl
            hover:from-red-600 hover:to-red-700
            transition-all transform
            hover:scale-[1.02] active:scale-[1.02]
            shadow-xl flex items-center justify-center gap-3
            disabled:opacity-80 disabled:cursor-not-allowed
            disabled:hover:scale-100 disabled:active:scale-100
            disabled:hover:from-red-500 disabled:hover:to-red-600
        `}
    >
        {isLoading ? (
            <>
                <Loader2 className='w-6 h-6 animate-spin' />
                <span>Adding to Cart...</span>
            </>
        ) : (
            <>
                Add to Cart - {formatPrice(product.price)}
            </>
        )}
    </button>
  )
}

export default AddToCartButton