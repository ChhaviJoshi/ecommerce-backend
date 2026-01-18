-- Clear old data
DELETE FROM products;

-- 1. ELECTRONICS
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('MacBook Pro 16"', 'M3 Max chip, 32GB RAM, 1TB SSD', 2499.99, 'electronics', 10, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'),
('iPhone 15 Pro', 'Titanium design, A17 Pro chip', 999.00, 'electronics', 25, 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=600&q=80'),
('Sony WH-1000XM5', 'Noise cancelling wireless headphones', 348.00, 'electronics', 50, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80'),
('Samsung 49" Odyssey', 'Curved Gaming Monitor 240Hz', 1200.00, 'electronics', 5, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'),
('Logitech MX Master 3S', 'Performance Wireless Mouse', 99.00, 'electronics', 100, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80');

-- 2. FASHION
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Levis 501 Original', 'Classic straight leg jeans', 69.50, 'fashion', 200, 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=600&q=80'),
('Nike Air Force 1', 'Classic white sneakers', 110.00, 'fashion', 80, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'),
('North Face Puffer', 'Insulated winter jacket', 250.00, 'fashion', 40, 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80'),
('Ray-Ban Aviator', 'Classic sunglasses gold frame', 160.00, 'fashion', 60, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80'),
('Adidas Hoodie', 'Cotton blend comfort hoodie', 45.00, 'fashion', 120, 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80');

-- 3. GROCERY
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Organic Whole Milk', '1 Gallon fresh milk', 5.99, 'grocery', 50, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'),
('Almond Butter', 'All natural creamy almond butter', 12.50, 'grocery', 30, 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=600&q=80'),
('Whole Wheat Bread', 'Organic sliced bread', 4.25, 'grocery', 40, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'),
('Arabica Coffee Beans', '1lb dark roast coffee', 18.00, 'grocery', 60, 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&q=80'),
('Green Tea Pack', '50 bags organic green tea', 8.99, 'grocery', 100, 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80');