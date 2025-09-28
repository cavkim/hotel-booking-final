#!/bin/bash

# Hotel Booking Frontend - API Organization Setup Script
# This script helps set up the new organized API structure

echo "🏨 Hotel Booking Frontend - API Organization Setup"
echo "=================================================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created successfully!"
    echo "⚠️  Please update the values in .env file according to your environment"
else
    echo "✅ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your API configuration"
echo "2. Set REACT_APP_DEBUG=true for development"
echo "3. Start the development server: npm start"
echo "4. Visit /api-test to test API endpoints"
echo ""
echo "📚 Documentation:"
echo "- API_ORGANIZATION_GUIDE.md - Complete API organization guide"
echo "- .env.example - Environment variables template"
echo ""
echo "🔧 New API Structure:"
echo "- src/config/apiConfig.js - Centralized configuration"
echo "- src/config/apiClient.js - Enhanced API client"
echo "- src/utils/apiUtils.js - API utility functions"
echo "- src/services/ - Updated service layer"
echo ""
echo "Happy coding! 🚀"
