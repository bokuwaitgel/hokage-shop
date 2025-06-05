#!/bin/bash


# E-commerce Project Generator
# This script creates a full-stack e-commerce project with Django + Next.js + Nginx + Docker


set -e


PROJECT_NAME=${1:-"ecommerce-shop"}
echo "🚀 Creating e-commerce project: $PROJECT_NAME"


# Create project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"


# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p backend/{api,core,products,orders,users,media,static}
mkdir -p frontend/{components,pages,styles,utils,public}
mkdir -p nginx
mkdir -p docker


# Create Docker Compose file
echo "🐳 Creating Docker Compose configuration..."
cat > docker-compose.yml << 'EOF'
version: '3.8'


services:
 db:
   image: postgres:15
   environment:
     POSTGRES_DB: ecommerce
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: postgres
   volumes:
     - postgres_data:/var/lib/postgresql/data
   ports:
     - "5432:5432"


 redis:
   image: redis:7-alpine
   ports:
     - "6378:6379"


 backend:
   build: ./backend
   command: python manage.py runserver 0.0.0.0:8000
   volumes:
     - ./backend:/app
     - media_volume:/app/media
   ports:
     - "8000:8000"
   depends_on:
     - db
     - redis
   environment:
     - DEBUG=1
     - DATABASE_URL=postgresql://postgres:postgres@db:5432/ecommerce
     - REDIS_URL=redis://redis:6378/0


 frontend:
   build: ./frontend
   command: npm run dev
   volumes:
     - ./frontend:/app
     - /app/node_modules
     - /app/.next
   ports:
     - "3000:3000"
   depends_on:
     - backend
   environment:
     - NEXT_PUBLIC_API_URL=http://localhost:8000


 nginx:
   build: ./nginx
   ports:
     - "80:80"
   depends_on:
     - backend
     - frontend
   volumes:
     - media_volume:/var/www/media


volumes:
 postgres_data:
 media_volume:
EOF


# Create Backend Dockerfile
echo "🐍 Creating Django backend..."
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim


WORKDIR /app


# Install system dependencies
RUN apt-get update && apt-get install -y \
   gcc \
   postgresql-client \
   && rm -rf /var/lib/apt/lists/*


# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# Copy project
COPY . .


# Collect static files
RUN python manage.py collectstatic --noinput || true


EXPOSE 8000


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
EOF


# Create Backend requirements.txt
cat > backend/requirements.txt << 'EOF'
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
django-environ==0.11.2
psycopg2-binary==2.9.7
redis==5.0.1
django-redis==5.4.0
Pillow==10.0.1
django-filter==23.3
djangorestframework-simplejwt==5.3.0
celery==5.3.4
gunicorn==21.2.0
EOF


# Create Django settings
cat > backend/core/__init__.py << 'EOF'
EOF


cat > backend/core/settings.py << 'EOF'
import os
from pathlib import Path
import environ


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Environment variables
env = environ.Env(
   DEBUG=(bool, False)
)


# Read .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY', default='django-insecure-change-me-in-production')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')


ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', 'nginx']


# Application definition
DJANGO_APPS = [
   'django.contrib.admin',
   'django.contrib.auth',
   'django.contrib.contenttypes',
   'django.contrib.sessions',
   'django.contrib.messages',
   'django.contrib.staticfiles',
]


THIRD_PARTY_APPS = [
   'rest_framework',
   'corsheaders',
   'rest_framework_simplejwt',
   'django_filters',
]


LOCAL_APPS = [
   'users',
   'products',
   'orders',
   'api',
]


INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


MIDDLEWARE = [
   'corsheaders.middleware.CorsMiddleware',
   'django.middleware.security.SecurityMiddleware',
   'django.contrib.sessions.middleware.SessionMiddleware',
   'django.middleware.common.CommonMiddleware',
   'django.middleware.csrf.CsrfViewMiddleware',
   'django.contrib.auth.middleware.AuthenticationMiddleware',
   'django.contrib.messages.middleware.MessageMiddleware',
   'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'core.urls'


TEMPLATES = [
   {
       'BACKEND': 'django.template.backends.django.DjangoTemplates',
       'DIRS': [],
       'APP_DIRS': True,
       'OPTIONS': {
           'context_processors': [
               'django.template.context_processors.debug',
               'django.template.context_processors.request',
               'django.contrib.auth.context_processors.auth',
               'django.contrib.messages.context_processors.messages',
           ],
       },
   },
]


WSGI_APPLICATION = 'core.wsgi.application'


# Database
DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.postgresql',
       'NAME': env('DB_NAME', default='ecommerce'),
       'USER': env('DB_USER', default='postgres'),
       'PASSWORD': env('DB_PASSWORD', default='postgres'),
       'HOST': env('DB_HOST', default='db'),
       'PORT': env('DB_PORT', default='5432'),
   }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
   {
       'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
   },
   {
       'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
   },
   {
       'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
   },
   {
       'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
   },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Django REST Framework
REST_FRAMEWORK = {
   'DEFAULT_AUTHENTICATION_CLASSES': [
       'rest_framework_simplejwt.authentication.JWTAuthentication',
   ],
   'DEFAULT_PERMISSION_CLASSES': [
       'rest_framework.permissions.IsAuthenticated',
   ],
   'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
   'PAGE_SIZE': 20,
   'DEFAULT_FILTER_BACKENDS': [
       'django_filters.rest_framework.DjangoFilterBackend',
       'rest_framework.filters.SearchFilter',
       'rest_framework.filters.OrderingFilter',
   ],
}


# CORS settings
CORS_ALLOWED_ORIGINS = [
   "http://localhost:3000",
   "http://127.0.0.1:3000",
   "http://frontend:3000",
]


CORS_ALLOW_CREDENTIALS = True


# JWT Settings
from datetime import timedelta


SIMPLE_JWT = {
   'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
   'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
   'ROTATE_REFRESH_TOKENS': True,
}


# Redis Cache
CACHES = {
   'default': {
       'BACKEND': 'django_redis.cache.RedisCache',
       'LOCATION': env('REDIS_URL', default='redis://redis:6378/0'),
       'OPTIONS': {
           'CLIENT_CLASS': 'django_redis.client.DefaultClient',
       }
   }
}


# Custom User Model
AUTH_USER_MODEL = 'users.User'
EOF


# Create Django URLs
cat > backend/core/urls.py << 'EOF'
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   path('admin/', admin.site.urls),
   path('api/', include('api.urls')),
]


if settings.DEBUG:
   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
EOF


# Create WSGI
cat > backend/core/wsgi.py << 'EOF'
import os
from django.core.wsgi import get_wsgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
application = get_wsgi_application()
EOF


# Create manage.py
cat > backend/manage.py << 'EOF'
#!/usr/bin/env python
import os
import sys


if __name__ == '__main__':
   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
   try:
       from django.core.management import execute_from_command_line
   except ImportError as exc:
       raise ImportError(
           "Couldn't import Django. Are you sure it's installed and "
           "available on your PYTHONPATH environment variable? Did you "
           "forget to activate a virtual environment?"
       ) from exc
   execute_from_command_line(sys.argv)
EOF


chmod +x backend/manage.py


# Create User model
cat > backend/users/__init__.py << 'EOF'
EOF


cat > backend/users/models.py << 'EOF'
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
   email = models.EmailField(unique=True)
   phone = models.CharField(max_length=20, blank=True)
   address = models.TextField(blank=True)
   date_of_birth = models.DateField(null=True, blank=True)
  
   USERNAME_FIELD = 'email'
   REQUIRED_FIELDS = ['username']
  
   def __str__(self):
       return self.email
EOF


cat > backend/users/admin.py << 'EOF'
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
   list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
   list_filter = ('is_staff', 'is_superuser', 'is_active')
   fieldsets = UserAdmin.fieldsets + (
       ('Additional Info', {'fields': ('phone', 'address', 'date_of_birth')}),
   )
EOF


cat > backend/users/apps.py << 'EOF'
from django.apps import AppConfig


class UsersConfig(AppConfig):
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'users'
EOF


# Create Products app
cat > backend/products/__init__.py << 'EOF'
EOF


cat > backend/products/models.py << 'EOF'
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Category(models.Model):
   name = models.CharField(max_length=100)
   slug = models.SlugField(unique=True)
   description = models.TextField(blank=True)
   created_at = models.DateTimeField(auto_now_add=True)
  
   class Meta:
       verbose_name_plural = "Categories"
  
   def __str__(self):
       return self.name


class Product(models.Model):
   name = models.CharField(max_length=200)
   slug = models.SlugField(unique=True)
   description = models.TextField()
   price = models.DecimalField(max_digits=10, decimal_places=2)
   category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
   image = models.ImageField(upload_to='products/', blank=True)
   stock = models.PositiveIntegerField(default=0)
   is_active = models.BooleanField(default=True)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
  
   class Meta:
       ordering = ['-created_at']
  
   def __str__(self):
       return self.name
  
   @property
   def is_in_stock(self):
       return self.stock > 0
EOF


cat > backend/products/admin.py << 'EOF'
from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
   list_display = ('name', 'slug', 'created_at')
   prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
   list_display = ('name', 'category', 'price', 'stock', 'is_active', 'created_at')
   list_filter = ('category', 'is_active', 'created_at')
   prepopulated_fields = {'slug': ('name',)}
   search_fields = ('name', 'description')
EOF


cat > backend/products/apps.py << 'EOF'
from django.apps import AppConfig


class ProductsConfig(AppConfig):
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'products'
EOF


# Create Orders app
cat > backend/orders/__init__.py << 'EOF'
EOF


cat > backend/orders/models.py << 'EOF'
from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product


User = get_user_model()


class Order(models.Model):
   STATUS_CHOICES = [
       ('pending', 'Pending'),
       ('processing', 'Processing'),
       ('shipped', 'Shipped'),
       ('delivered', 'Delivered'),
       ('cancelled', 'Cancelled'),
   ]
  
   user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
   status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
   total_amount = models.DecimalField(max_digits=10, decimal_places=2)
   shipping_address = models.TextField()
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
  
   class Meta:
       ordering = ['-created_at']
  
   def __str__(self):
       return f"Order {self.id} - {self.user.email}"


class OrderItem(models.Model):
   order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
   product = models.ForeignKey(Product, on_delete=models.CASCADE)
   quantity = models.PositiveIntegerField()
   price = models.DecimalField(max_digits=10, decimal_places=2)
  
   def __str__(self):
       return f"{self.quantity}x {self.product.name}"
  
   @property
   def total_price(self):
       return self.quantity * self.price
EOF


cat > backend/orders/admin.py << 'EOF'
from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
   model = OrderItem
   extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
   list_display = ('id', 'user', 'status', 'total_amount', 'created_at')
   list_filter = ('status', 'created_at')
   inlines = [OrderItemInline]
   readonly_fields = ('created_at', 'updated_at')
EOF


cat > backend/orders/apps.py << 'EOF'
from django.apps import AppConfig


class OrdersConfig(AppConfig):
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'orders'
EOF


# Create API serializers and views
cat > backend/api/__init__.py << 'EOF'
EOF


cat > backend/api/serializers.py << 'EOF'
from rest_framework import serializers
from django.contrib.auth import get_user_model
from products.models import Product, Category
from orders.models import Order, OrderItem


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone', 'address')
       read_only_fields = ('id',)


class CategorySerializer(serializers.ModelSerializer):
   class Meta:
       model = Category
       fields = ('id', 'name', 'slug', 'description')


class ProductSerializer(serializers.ModelSerializer):
   category = CategorySerializer(read_only=True)
  
   class Meta:
       model = Product
       fields = ('id', 'name', 'slug', 'description', 'price', 'category', 'image', 'stock', 'is_in_stock')


class OrderItemSerializer(serializers.ModelSerializer):
   product = ProductSerializer(read_only=True)
  
   class Meta:
       model = OrderItem
       fields = ('id', 'product', 'quantity', 'price', 'total_price')


class OrderSerializer(serializers.ModelSerializer):
   items = OrderItemSerializer(many=True, read_only=True)
   user = UserSerializer(read_only=True)
  
   class Meta:
       model = Order
       fields = ('id', 'user', 'status', 'total_amount', 'shipping_address', 'items', 'created_at')
EOF


cat > backend/api/views.py << 'EOF'
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from products.models import Product, Category
from orders.models import Order
from .serializers import (
   UserSerializer, ProductSerializer, CategorySerializer,
   OrderSerializer
)


User = get_user_model()


# Authentication Views
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
   serializer = UserSerializer(data=request.data)
   if serializer.is_valid():
       user = User.objects.create_user(
           username=serializer.validated_data['username'],
           email=serializer.validated_data['email'],
           password=request.data['password']
       )
       refresh = RefreshToken.for_user(user)
       return Response({
           'user': UserSerializer(user).data,
           'refresh': str(refresh),
           'access': str(refresh.access_token),
       })
   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
   username = request.data.get('username')
   password = request.data.get('password')
  
   user = authenticate(username=username, password=password)
   if user:
       refresh = RefreshToken.for_user(user)
       return Response({
           'user': UserSerializer(user).data,
           'refresh': str(refresh),
           'access': str(refresh.access_token),
       })
   return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Product Views
class ProductListView(generics.ListAPIView):
   queryset = Product.objects.filter(is_active=True)
   serializer_class = ProductSerializer
   permission_classes = [AllowAny]
  
   def get_queryset(self):
       queryset = super().get_queryset()
       category = self.request.query_params.get('category')
       search = self.request.query_params.get('search')
      
       if category:
           queryset = queryset.filter(category__slug=category)
       if search:
           queryset = queryset.filter(name__icontains=search)
          
       return queryset


class ProductDetailView(generics.RetrieveAPIView):
   queryset = Product.objects.filter(is_active=True)
   serializer_class = ProductSerializer
   permission_classes = [AllowAny]
   lookup_field = 'slug'


class CategoryListView(generics.ListAPIView):
   queryset = Category.objects.all()
   serializer_class = CategorySerializer
   permission_classes = [AllowAny]


# Order Views
class OrderListView(generics.ListAPIView):
   serializer_class = OrderSerializer
   permission_classes = [IsAuthenticated]
  
   def get_queryset(self):
       return Order.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
   serializer = UserSerializer(request.user)
   return Response(serializer.data)
EOF


cat > backend/api/urls.py << 'EOF'
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views


urlpatterns = [
   # Authentication
   path('auth/register/', views.register, name='register'),
   path('auth/login/', views.login, name='login'),
   path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('auth/profile/', views.user_profile, name='user_profile'),
  
   # Products
   path('products/', views.ProductListView.as_view(), name='product_list'),
   path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
   path('categories/', views.CategoryListView.as_view(), name='category_list'),
  
   # Orders
   path('orders/', views.OrderListView.as_view(), name='order_list'),
]
EOF


cat > backend/api/apps.py << 'EOF'
from django.apps import AppConfig


class ApiConfig(AppConfig):
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'api'
EOF


# Create Frontend Dockerfile
echo "⚛️ Creating Next.js frontend..."
cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine


WORKDIR /app


# Install dependencies
COPY package*.json ./
RUN npm install


# Copy source code
COPY . .


EXPOSE 3000


CMD ["npm", "run", "dev"]
EOF


# Create Next.js package.json
cat > frontend/package.json << 'EOF'
{
 "name": "ecommerce-frontend",
 "version": "0.1.0",
 "private": true,
 "scripts": {
   "dev": "next dev",
   "build": "next build",
   "start": "next start",
   "lint": "next lint"
 },
 "dependencies": {
   "next": "14.0.0",
   "react": "^18",
   "react-dom": "^18",
   "axios": "^1.5.0",
   "react-query": "^3.39.3",
   "react-hook-form": "^7.45.0",
   "tailwindcss": "^3.3.0",
   "autoprefixer": "^10.4.14",
   "postcss": "^8.4.24"
 },
 "devDependencies": {
   "typescript": "^5",
   "@types/node": "^20",
   "@types/react": "^18",
   "@types/react-dom": "^18",
   "eslint": "^8",
   "eslint-config-next": "14.0.0"
 }
}
EOF


# Create Next.js config
cat > frontend/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 output: 'standalone',
 images: {
   domains: ['localhost', 'backend'],
 },
 async rewrites() {
   return [
     {
       source: '/api/:path*',
       destination: 'http://backend:8000/api/:path*',
     },
   ]
 },
}


module.exports = nextConfig
EOF


# Create Tailwind config
cat > frontend/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
   './pages/**/*.{js,ts,jsx,tsx,mdx}',
   './components/**/*.{js,ts,jsx,tsx,mdx}',
   './app/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 theme: {
   extend: {},
 },
 plugins: [],
}
EOF


# Create TypeScript config
cat > frontend/tsconfig.json << 'EOF'
{
 "compilerOptions": {
   "target": "es5",
   "lib": ["dom", "dom.iterable", "es6"],
   "allowJs": true,
   "skipLibCheck": true,
   "strict": true,
   "noEmit": true,
   "esModuleInterop": true,
   "module": "esnext",
   "moduleResolution": "bundler",
   "resolveJsonModule": true,
   "isolatedModules": true,
   "jsx": "preserve",
   "incremental": true,
   "plugins": [
     {
       "name": "next"
     }
   ],
   "baseUrl": ".",
   "paths": {
     "@/*": ["./*"]
   }
 },
 "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
 "exclude": ["node_modules"]
}
EOF


# Create production Dockerfile for frontend
cat > frontend/Dockerfile.prod << 'EOF'
FROM node:18-alpine AS builder


WORKDIR /app


# Install dependencies
COPY package*.json ./
RUN npm install


# Copy source code and build
COPY . .
RUN npm run build


# Production image
FROM node:18-alpine AS runner


WORKDIR /app


ENV NODE_ENV production


# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs


EXPOSE 3000


ENV PORT 3000
ENV HOSTNAME "0.0.0.0"


CMD ["node", "server.js"]
EOF




# Create production Docker Compose
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'


services:
 db:
   image: postgres:15
   environment:
     POSTGRES_DB: ecommerce
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: postgres
   volumes:
     - postgres_data:/var/lib/postgresql/data
   networks:
     - app-network


 redis:
   image: redis:7-alpine
   networks:
     - app-network


 backend:
   build:
     context: ./backend
     dockerfile: Dockerfile
   command: gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 4
   volumes:
     - ./backend:/app
     - media_volume:/app/media
   depends_on:
     - db
     - redis
   environment:
     - DEBUG=0
     - DATABASE_URL=postgresql://postgres:postgres@db:5432/ecommerce
     - REDIS_URL=redis://redis:6378/0
   networks:
     - app-network


 frontend:
   build:
     context: ./frontend
     dockerfile: Dockerfile.prod
   depends_on:
     - backend
   environment:
     - NEXT_PUBLIC_API_URL=http://localhost:8000
   networks:
     - app-network


 nginx:
   build: ./nginx
   ports:
     - "80:80"
   depends_on:
     - backend
     - frontend
   volumes:
     - media_volume:/var/www/media
   networks:
     - app-network


volumes:
 postgres_data:
 media_volume:


networks:
 app-network:
   driver: bridge
EOF
cat > frontend/pages/_app.tsx << 'EOF'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'


export default function App({ Component, pageProps }: AppProps) {
 const [queryClient] = useState(() => new QueryClient())


 return (
   <QueryClientProvider client={queryClient}>
     <Component {...pageProps} />
   </QueryClientProvider>
 )
}
EOF


cat > frontend/pages/index.tsx << 'EOF'
import Head from 'next/head'
import { useQuery } from 'react-query'
import axios from 'axios'


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'


export default function Home() {
 const { data: products, isLoading } = useQuery('products', () =>
   axios.get(`${API_URL}/api/products/`).then(res => res.data)
 )


 return (
   <>
     <Head>
       <title>E-commerce Shop</title>
       <meta name="description" content="Modern e-commerce shop" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="icon" href="/favicon.ico" />
     </Head>
     <main className="min-h-screen bg-gray-50">
       <div className="container mx-auto px-4 py-8">
         <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Shop</h1>
        
         {isLoading ? (
           <div className="text-center">Loading products...</div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {products?.results?.map((product: any) => (
               <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                 <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                 <p className="text-gray-600 mb-4">{product.description}</p>
                 <div className="flex justify-between items-center">
                   <span className="text-2xl font-bold text-green-600">
                     ${product.price}
                   </span>
                   <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                     Add to Cart
                   </button>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
     </main>
   </>
 )
}
EOF


cat > frontend/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;


html,
body {
 padding: 0;
 margin: 0;
 font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
   Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}


a {
 color: inherit;
 text-decoration: none;
}


* {
 box-sizing: border-box;
}
EOF


# Create Nginx configuration
echo "🌐 Creating Nginx configuration..."
cat > nginx/Dockerfile << 'EOF'
FROM nginx:alpine


COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
EOF


cat > nginx/nginx.conf << 'EOF'
events {
   worker_connections 1024;
}


http {
   upstream backend {
       server backend:8000;
   }


   upstream frontend {
       server frontend:3000;
   }


   server {
       listen 80;
       server_name localhost;


       # Frontend
       location / {
           proxy_pass http://frontend;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }


       # Backend API
       location /api/ {
           proxy_pass http://backend;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }


       # Django Admin
       location /admin/ {
           proxy_pass http://backend;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }


       # Static files
       location /static/ {
           proxy_pass http://backend;
       }


       # Media files
       location /media/ {
           alias /var/www/media/;
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
}
EOF


# Create environment file
echo "⚙️ Creating environment configuration..."
cat > backend/.env << 'EOF'
DEBUG=1
SECRET_KEY=django-insecure-development-key-change-in-production
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
REDIS_URL=redis://redis:6378/0
EOF


# Create build script
echo "🔨 Creating build script..."
cat > build.sh << 'EOF'
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
EOF


chmod +x build.sh


# Create development script with better error handling
cat > dev.sh << 'EOF'
#!/bin/bash


# Development helper script
set -e


case "$1" in
   "start")
       echo "🚀 Starting development environment..."
       docker-compose up
       ;;
   "stop")
       echo "🛑 Stopping development environment..."
       docker-compose down
       ;;
   "restart")
       echo "🔄 Restarting development environment..."
       docker-compose restart
       ;;
   "build")
       echo "🔨 Building containers..."
       docker-compose build --no-cache
       ;;
   "logs")
       service=${2:-""}
       if [ -n "$service" ]; then
           echo "📋 Showing logs for $service..."
           docker-compose logs -f "$service"
       else
           echo "📋 Showing all logs..."
           docker-compose logs -f
       fi
       ;;
   "shell")
       echo "🐚 Opening Django shell..."
       docker-compose exec backend python manage.py shell
       ;;
   "bash")
       service=${2:-"backend"}
       echo "💻 Opening bash shell for $service..."
       docker-compose exec "$service" /bin/bash
       ;;
   "migrate")
       echo "🗄️ Running migrations..."
       docker-compose exec backend python manage.py makemigrations
       docker-compose exec backend python manage.py migrate
       ;;
   "superuser")
       echo "👤 Creating superuser..."
       docker-compose exec backend python manage.py createsuperuser
       ;;
   "test")
       echo "🧪 Running tests..."
       docker-compose exec backend python manage.py test
       ;;
   "npm")
       shift
       echo "📦 Running npm command: $@"
       docker-compose exec frontend npm "$@"
       ;;
   "prod")
       echo "🚀 Starting production environment..."
       docker-compose -f docker-compose.prod.yml up --build
       ;;
   "clean")
       echo "🧹 Cleaning up..."
       docker-compose down -v
       docker system prune -f
       ;;
   "reset")
       echo "🔄 Resetting everything..."
       docker-compose down -v
       docker-compose build --no-cache
       docker-compose up -d
       sleep 10
       docker-compose exec backend python manage.py migrate
       echo "✅ Reset complete!"
       ;;
   *)
       echo "Usage: $0 {start|stop|restart|build|logs|shell|bash|migrate|superuser|test|npm|prod|clean|reset}"
       echo ""
       echo "Commands:"
       echo "  start      - Start the development environment"
       echo "  stop       - Stop the development environment"
       echo "  restart    - Restart all services"
       echo "  build      - Rebuild all containers"
       echo "  logs [svc] - Show container logs (optionally for specific service)"
       echo "  shell      - Open Django shell"
       echo "  bash [svc] - Open bash shell (default: backend)"
       echo "  migrate    - Run database migrations"
       echo "  superuser  - Create Django superuser"
       echo "  test       - Run tests"
       echo "  npm <cmd>  - Run npm command in frontend container"
       echo "  prod       - Start production environment"
       echo "  clean      - Remove containers and volumes"
       echo "  reset      - Reset everything and rebuild"
       exit 1
       ;;
esac
EOF


chmod +x dev.sh


# Create README
cat > README.md << 'EOF'
# E-commerce Full-Stack Application


A modern e-commerce application built with Django REST Framework, Next.js, Nginx, and Docker.


## 🏗️ Architecture


- **Backend**: Django REST Framework with PostgreSQL
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Reverse Proxy**: Nginx
- **Containerization**: Docker & Docker Compose
- **Cache**: Redis


## 🚀 Quick Start


1. **Generate the project** (if using the generator script):
  ```bash
  ./generate-project.sh my-ecommerce-shop
  cd my-ecommerce-shop
  ```


2. **Build and start the application**:
  ```bash
  ./build.sh
  ```


3. **Access the application**:
  - Frontend: http://localhost:3000
  - API: http://localhost:8000/api/
  - Admin: http://localhost:8000/admin/
  - Production (Nginx): http://localhost


## 🛠️ Development


### Available Commands


```bash
# Start development environment
./dev.sh start


# Stop services
./dev.sh stop


# View logs
./dev.sh logs


# Run migrations
./dev.sh migrate


# Open Django shell
./dev.sh shell


# Run tests
./dev.sh test


# Clean up containers and volumes
./dev.sh clean
```


### Manual Docker Commands


```bash
# Build containers
docker-compose build


# Start services
docker-compose up -d


# View logs
docker-compose logs -f


# Stop services
docker-compose down
```


## 🔧 Configuration


### Environment Variables


Backend environment variables are stored in `backend/.env`:


```env
DEBUG=1
SECRET_KEY=your-secret-key
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
REDIS_URL=redis://redis:6378/0
```


### Default Admin User


- **Username**: admin
- **Password**: admin123


## 📱 API Endpoints


### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile


### Products
- `GET /api/products/` - List products
- `GET /api/products/{slug}/` - Product detail
- `GET /api/categories/` - List categories


### Orders
- `GET /api/orders/` - User orders


## 🏢 Production Deployment


For production deployment:


1. Update environment variables
2. Set `DEBUG=False` in Django settings
3. Configure proper SECRET_KEY
4. Set up SSL certificates in Nginx
5. Use production database credentials
6. Configure static file serving


## 📁 Project Structure


```
project/
├── backend/              # Django application
│   ├── api/             # REST API endpoints
│   ├── core/            # Django settings
│   ├── products/        # Product models
│   ├── orders/          # Order models
│   ├── users/           # User models
│   └── requirements.txt
├── frontend/            # Next.js application
│   ├── pages/           # Next.js pages
│   ├── components/      # React components
│   ├── styles/          # CSS styles
│   └── package.json
├── nginx/               # Nginx configuration
├── docker-compose.yml   # Docker services
├── build.sh            # Build script
├── dev.sh              # Development helper
└── README.md
```


## 🤝 Contributing


1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## 📄 License


This project is licensed under the MIT License.
EOF


# Create .gitignore
cat > .gitignore << 'EOF'
# Django
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST


# Django specific
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal


# Media files
media/
staticfiles/


# Environment variables
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/


# Next.js
.next/
out/
npm-debug.log*
yarn-debug.log*
yarn-error.log*


# Node.js
node_modules/
.npm


# Docker
.docker/


# IDE
.vscode/
.idea/
*.swp
*.swo
*~


# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF


echo "✅ Project '$PROJECT_NAME' created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. cd $PROJECT_NAME"
echo "2. ./build.sh"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🎉 Happy coding!"

