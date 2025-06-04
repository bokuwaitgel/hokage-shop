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
REDIS_URL=redis://redis:6379/0
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
