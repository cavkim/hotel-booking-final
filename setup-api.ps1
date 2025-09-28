# Hotel Booking Frontend - API Organization Setup Script (PowerShell)
# This script helps set up the new organized API structure

Write-Host "🏨 Hotel Booking Frontend - API Organization Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created successfully!" -ForegroundColor Green
    Write-Host "⚠️  Please update the values in .env file according to your environment" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env file with your API configuration"
Write-Host "2. Set REACT_APP_DEBUG=true for development"
Write-Host "3. Start the development server: npm start"
Write-Host "4. Visit /api-test to test API endpoints"
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- API_ORGANIZATION_GUIDE.md - Complete API organization guide"
Write-Host "- .env.example - Environment variables template"
Write-Host ""
Write-Host "🔧 New API Structure:" -ForegroundColor Cyan
Write-Host "- src/config/apiConfig.js - Centralized configuration"
Write-Host "- src/config/apiClient.js - Enhanced API client"
Write-Host "- src/utils/apiUtils.js - API utility functions"
Write-Host "- src/services/ - Updated service layer"
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
