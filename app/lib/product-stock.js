/**
 * Product stock logic: decrement on sale, auto status from quantity.
 * - 0 → out_of_stock
 * - 1–15 → low_stock
 * - >15 → in_stock
 */

const LOW_STOCK_THRESHOLD = 15;
const PRODUCTS_COLLECTION = "products";

/**
 * Compute stock_status from numeric quantity.
 * @param {number} quantity
 * @returns {'out_of_stock'|'low_stock'|'in_stock'}
 */
export function stockStatusFromQuantity(quantity) {
  const q = Number(quantity);
  if (q <= 0) return "out_of_stock";
  if (q <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

/**
 * Decrement a product's stock by `quantity` and update stock_status.
 * Finds product by MongoDB _id or by product_id (string). Uses native MongoDB driver.
 * Does not go below 0. Returns updated product or null.
 * @param {import('mongodb').Db} db - MongoDB database instance from connectToDatabase()
 * @param {string} productId - MongoDB _id (hex string) or product_id
 * @param {number} quantity - How many to subtract (e.g. 1 per sale)
 */
export async function decrementProductStock(db, productId, quantity) {
  if (!db || !productId || quantity == null || quantity < 1) return null;
  const numQty = Math.max(0, Number(quantity));
  const collection = db.collection(PRODUCTS_COLLECTION);

  let product = null;
  const { ObjectId } = await import("mongodb");
  if (ObjectId.isValid(productId) && String(new ObjectId(productId)) === productId) {
    product = await collection.findOne({ _id: new ObjectId(productId) });
  }
  if (!product) {
    product = await collection.findOne({ product_id: productId });
  }
  if (!product) return null;

  const current = Number(product.stock_quantity) || 0;
  const newQuantity = Math.max(0, current - numQty);
  const stock_status = stockStatusFromQuantity(newQuantity);

  await collection.updateOne(
    { _id: product._id },
    { $set: { stock_quantity: newQuantity, stock_status } }
  );
  return { ...product, stock_quantity: newQuantity, stock_status };
}
