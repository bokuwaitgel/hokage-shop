#!/bin/bash

# E-commerce Project Build Script
set -e

echo "🚀 Building E-commerce Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start services
echo "🐳 Building Docker containers..."
docker-compose build

echo "📦 Starting services..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run Django migrations
echo "🗄️ Running database migrations..."
docker-compose exec -T backend python manage.py makemigrations users
docker-compose exec -T backend python manage.py makemigrations products
docker-compose exec -T backend python manage.py makemigrations orders
docker-compose exec -T backend python manage.py migrate

# Create superuser (optional)
echo "👤 Creating Django superuser..."
docker-compose exec -T backend python manage.py shell << 'PYTHON'
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
PYTHON

# Create sample data
echo "📝 Creating sample data..."
docker-compose exec -T backend python manage.py shell << 'PYTHON'
from products.models import Category, Product

# Create categories
if not Category.objects.exists():
    electronics = Category.objects.create(
        name='Electronics',
        slug='electronics',
        description='Latest electronic gadgets and devices'
    )
    clothing = Category.objects.create(
        name='Clothing',
        slug='clothing',
        description='Fashion and apparel for all'
    )
    books = Category.objects.create(
        name='Books',
        slug='books',
        description='Books for learning and entertainment'
    )
    
    # Create sample products
    Product.objects.create(
        name='Smartphone',
        slug='smartphone',
        description='Latest smartphone with advanced features',
        price=599.99,
        category=electronics,
        stock=50
    )
    Product.objects.create(
        name='Laptop',
        slug='laptop',
        description='High-performance laptop for work and gaming',
        price=1299.99,
        category=electronics,
        stock=25
    )
    Product.objects.create(
        name='T-Shirt',
        slug='t-shirt',
        description='Comfortable cotton t-shirt',
        price=19.99,
        category=clothing,
        stock=100
    )
    Product.objects.create(
        name='Programming Book',
        slug='programming-book',
        description='Learn programming with this comprehensive guide',
        price=39.99,
        category=books,
        stock=75
    )
    
    print('Sample data created successfully!')
else:
    print('Sample data already exists')
PYTHON

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
docker-compose exec -T frontend npm install

echo "✅ Build completed successfully!"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000/api/"
echo "   Django Admin: http://localhost:8000/admin/"
echo "   Nginx (Production): http://localhost"
echo ""
echo "🔑 Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🐳 Docker commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
