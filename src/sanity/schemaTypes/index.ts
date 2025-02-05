import { type SchemaTypeDefinition } from 'sanity'
import { order, orderItem, shippingAddress } from '@/sanity/schemaTypes/schemas/order'
import { product } from '@/sanity/schemaTypes/schemas/product'
import { productCategory } from '@/sanity/schemaTypes/schemas/product-category'
import { promotionCampaign } from '@/sanity/schemaTypes/schemas/promotion-campaign'
import { promotionCode } from '@/sanity/schemaTypes/schemas/promotion-code'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,

    
    productCategory,
    product,
    
    shippingAddress,
    orderItem,
    order,
  ],
}
