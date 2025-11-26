# fgcalc - AWS Fargate Pricing Calculator

> A modern, open-source AWS Fargate pricing calculator built with React, Vite, and TailwindCSS

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

- **Real-time Cost Calculation**: Instantly calculate AWS Fargate costs based on your configuration
- **Currency Conversion**: Support for 160+ currencies with real-time exchange rates from [open.er-api.com](https://open.er-api.com)
- **Auto-Update Rates**: Exchange rates automatically update every minute
- **Multiple Regions**: Support for all AWS regions where Fargate is available
- **Fargate & Fargate Spot**: Calculate costs for both standard and Spot instances
- **Flexible Time Periods**: Estimate costs per hour, day, month, or year
- **Modern UI**: Beautiful, responsive design with TailwindCSS and purple/indigo theme
- **Clean Code**: Well-documented, maintainable codebase following best practices

## 📦 Installation

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/theuves/fgcalc.git
cd fgcalc

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

1. **Select Region**: Choose your AWS region from the dropdown
2. **Configure Resources**:
   - Set the time period for cost estimation
   - Select CPU (vCPU) allocation
   - Choose Memory (GiB) allocation
   - Specify number of Fargate tasks
   - Specify number of Fargate Spot tasks (optional)
3. **View Costs**: See real-time cost breakdown with detailed pricing per component

## 🏗️ Tech Stack

- **React 19.2**: Latest React version with modern hooks and features
- **Vite 7.2**: Lightning-fast build tool and dev server
- **TailwindCSS 4.1**: Utility-first CSS framework for rapid UI development
- **ESLint**: Code quality and consistency enforcement

## 📁 Project Structure

```
fgcalc/
├── src/
│   ├── components/          # React components
│   │   ├── Header/         # Header with region/currency selection
│   │   ├── Banner.jsx      # Promotional banner
│   │   ├── TimeInput.jsx   # Time period selector
│   │   ├── CPUInput.jsx    # CPU configuration
│   │   ├── RAMInput.jsx    # Memory configuration
│   │   ├── CapacityInput.jsx # Task capacity selector
│   │   └── Table.jsx       # Cost breakdown table
│   ├── utils/              # Utility functions
│   │   ├── createPriceGetter.js # Price calculation logic
│   │   ├── data.js         # AWS pricing data
│   │   ├── formatPrice.js  # Currency formatting
│   │   ├── getTime.js      # Time conversion
│   │   └── getExchangeRates.js # Currency exchange (future)
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles & Tailwind imports
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## 🎨 Design Decisions

### Color Scheme
The application uses a **purple and indigo gradient** theme to create a modern, professional look while avoiding similarities with AWS's orange branding to prevent copyright concerns.

### Component Architecture
- **Functional Components**: All components use React hooks for state management
- **Props Pattern**: Clear prop interfaces for component communication
- **Single Responsibility**: Each component handles one specific piece of functionality

### State Management
- **useState**: Local state for form inputs and user selections
- **useEffect**: Reactive price calculations when inputs change
- **useMemo**: Optimized RAM value calculations based on CPU

## 🌐 Supported Regions

The calculator supports all AWS regions where Fargate is available, including:
- US East (N. Virginia, Ohio)
- US West (N. California, Oregon)
- Europe (Frankfurt, Ireland, London, Paris, Stockholm)
- Asia Pacific (Mumbai, Seoul, Singapore, Sydney, Tokyo)
- And many more...

## 💰 Pricing Data

Pricing data is sourced from AWS official pricing and stored in `src/utils/data.js`. The calculator uses real AWS Fargate pricing for both standard and Spot instances.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [license.txt](license.txt) file for details.

## 🙏 Acknowledgments

- Original Svelte version by [@theuves](https://github.com/theuves)
- Converted to React + Vite + TailwindCSS
- Powered by [Fidalgo IT Solutions](https://fidalgoitsolutions.com.br)

## 📧 Contact

For questions or support, please open an issue on GitHub or visit [Fidalgo IT Solutions](https://fidalgoitsolutions.com.br).

---

Made with ❤️ by the open-source community
