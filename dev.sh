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
