# Adjustment & Cut Codes Management System

A modern, sleek web application for managing adjustment and cut codes across WMS systems. Built with Next.js, TypeScript, TailwindCSS, and shadcn/ui components.

## 🚀 Features

### Core Functionality
- **Modern Dashboard**: Clean, intuitive interface with real-time statistics
- **Advanced Search**: Multi-field search with code-first prioritization
- **Bulk Operations**: Select multiple codes for batch delete/archive operations
- **Duplicate Detection**: Real-time validation to prevent duplicate entries
- **Archive Management**: 12-month retention policy for legacy WMS data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Key Improvements Over Original System
- **Enhanced UI/UX**: Modern design with improved usability
- **WMS Instance Display**: Clear visibility of WMS and production instance per site
- **Smart Search**: Searches across all fields with intelligent ranking
- **Bulk Actions**: Efficient mass operations with confirmation dialogs
- **Status Management**: Clear visual indicators for active/archived codes
- **Impact Type Tracking**: AMC, Customer, and No Impact categorization

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** (for version control)

## 🚀 Quick Start

### 1. Install Node.js
If Node.js is not installed, download and install it from [nodejs.org](https://nodejs.org/)

### 2. Clone and Setup
```bash
# Navigate to the project directory
cd C:\Users\2395805\CascadeProjects\adjustment-cut-codes

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Access the Application
Open your browser and navigate to: `http://localhost:3000`

## 📦 Installation Commands

```bash
# Install all dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🏗 Project Structure

```
adjustment-cut-codes/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── label.tsx
│   │   │   └── select.tsx
│   │   ├── code-table.tsx      # Main data table
│   │   ├── stats-cards.tsx     # Dashboard statistics
│   │   ├── add-code-dialog.tsx # Add new code form
│   │   └── bulk-actions-bar.tsx # Bulk operations
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## 🎨 UI Components

### Dashboard Features
- **Statistics Cards**: Total, Active, Archived, and Duplicate counts
- **Search Bar**: Multi-field search with real-time filtering
- **Filter Dropdown**: Status-based filtering (All, Active, Archived)
- **Action Buttons**: Add Code, Export, Advanced Filter

### Data Table
- **Sortable Columns**: Click headers to sort by any field
- **Bulk Selection**: Checkbox selection with "Select All" functionality
- **Status Badges**: Color-coded status indicators
- **Impact Badges**: Visual impact type classification
- **Action Buttons**: View, Edit, Archive, Delete per row

### Add Code Dialog
- **Form Validation**: Required field validation
- **Dropdown Selectors**: WMS, Instance, Category, Impact Type
- **Duplicate Prevention**: Real-time duplicate checking
- **Auto-complete**: Smart field suggestions

## 📊 Data Model

### Code Structure
```typescript
interface Code {
  id: string
  code: string              // Unique code identifier
  description: string       // Human-readable description
  wms: string              // WMS system (HighJump, RedPrairie, etc.)
  instance: string         // PROD, TEST, ARCHIVE
  facility: string         // Facility identifier
  customer: string         // Customer name or "All Customers"
  category: string         // Adjustment or Cut
  impactType: string       // AMC, Customer, No Impact
  status: string           // Active, Archived
  createdDate: string      // Creation timestamp
  lastModified: string     // Last modification timestamp
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration (when backend is implemented)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
DATABASE_URL=your_database_connection_string

# Authentication (if needed)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Components**: Extend shadcn/ui components in `src/components/ui/`
- **Styling**: Update global styles in `src/app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start
```

## 🔄 Development Workflow

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Develop and test locally
3. Update documentation
4. Submit pull request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive component names

## 📈 Performance Optimizations

- **Next.js App Router**: Optimized routing and rendering
- **Code Splitting**: Automatic component-level splitting
- **Image Optimization**: Next.js built-in image optimization
- **CSS Optimization**: TailwindCSS purging unused styles
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 🔒 Security Considerations

- **Input Validation**: All forms use Zod schema validation
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection
- **Environment Variables**: Sensitive data in environment files

## 🐛 Troubleshooting

### Common Issues

**Node.js not found**
```bash
# Install Node.js from nodejs.org
# Restart terminal after installation
node --version
```

**Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port already in use**
```bash
# Use different port
npm run dev -- -p 3001
```

**TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update dependencies
npm update
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Built with ❤️ using modern web technologies for efficient WMS code management.**
