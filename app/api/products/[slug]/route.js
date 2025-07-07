
import Products from '@/Modules/Product_test/product_test';
import { connectToDatabase } from '@/app/utils/mongodb';

export default async function handler(req, res) {
  const { slug } = req.query;

  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const product = await Product.findOne({ slug });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
