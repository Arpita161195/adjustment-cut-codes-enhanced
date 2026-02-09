# Setup Guide - Adjustment & Cut Codes Management System

## 🚀 Quick Setup Instructions

### Step 1: Install Node.js
1. Download Node.js from [nodejs.org](https://nodejs.org/) (version 18 or higher)
2. Run the installer and follow the setup wizard
3. Verify installation by opening Command Prompt and running:
   ```cmd
   node --version
   npm --version
   ```

### Step 2: Navigate to Project Directory
```cmd
cd C:\Users\2395805\CascadeProjects\adjustment-cut-codes
```

### Step 3: Install Dependencies
```cmd
npm install
```

### Step 4: Start Development Server
```cmd
npm run dev
```

### Step 5: Open Application
Open your web browser and go to: `http://localhost:3000`

## 🔧 Alternative Setup Methods

### Using Yarn (Alternative Package Manager)
```cmd
# Install Yarn globally
npm install -g yarn

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Using PowerShell
```powershell
# Navigate to project
Set-Location "C:\Users\2395805\CascadeProjects\adjustment-cut-codes"

# Install and run
npm install
npm run dev
```

## 🛠 Development Commands

```cmd
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📱 Mobile Testing

The application is responsive and works on:
- Desktop (1920x1080+)
- Tablet (768px+)
- Mobile (375px+)

## 🔍 Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Restart Command Prompt after installing Node.js

### Issue: "Port 3000 is already in use"
**Solution**: Use a different port
```cmd
npm run dev -- -p 3001
```

### Issue: Dependencies not installing
**Solution**: Clear cache and reinstall
```cmd
npm cache clean --force
rmdir /s node_modules
del package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**: The errors shown in the IDE are expected before running `npm install`. They will be resolved once dependencies are installed.

## 📋 System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB for project + dependencies
- **Network**: Internet connection for initial setup

## 🎯 Next Steps After Setup

1. **Explore the Interface**: Navigate through the dashboard and features
2. **Add Sample Data**: Use the "Add Code" button to create test entries
3. **Test Search**: Try the search functionality with different filters
4. **Bulk Operations**: Select multiple items and test bulk actions
5. **Responsive Design**: Test on different screen sizes

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Refer to the main README.md file
3. Ensure Node.js is properly installed
4. Verify you're in the correct directory

## 🚀 Production Deployment

For production deployment, see the main README.md file for detailed instructions on:
- Vercel deployment
- Docker containerization
- Environment configuration
- Performance optimization

---

**Ready to start? Run `npm install` then `npm run dev` and visit http://localhost:3000**
