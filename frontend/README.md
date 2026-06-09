# Skincare Website - Frontend

## Description
React-based frontend for the skincare website with modern UI and routing.

## Installation

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development mode:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for production:
```bash
npm build
```

## Project Structure

```
frontend/
├── public/          # Static files
│   └── index.html   # Main HTML file
├── src/
│   ├── components/  # Reusable React components
│   ├── pages/       # Page components
│   ├── services/    # API service calls
│   ├── styles/      # CSS stylesheets
│   ├── App.js       # Main App component
│   └── index.js     # React entry point
├── package.json     # Dependencies and scripts
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## Available Routes

- `/` - Home page
- `/products` - Products listing page

## Key Features

- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Responsive Design**: Mobile-friendly layout
- **API Integration**: Connected to backend API

## Environment Variables

Create a `.env` file in the frontend folder (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Requirements

- Node.js 14+
- npm or yarn

## Notes

- The frontend is configured to proxy API requests to `http://localhost:5000` in development mode.
- Additional components and pages can be created in the respective folders as needed.
- Styling can be enhanced with CSS preprocessors (SASS) or CSS-in-JS libraries.

## Next Steps

1. Create additional components in `src/components/`
2. Add more pages in `src/pages/`
3. Implement authentication logic
4. Add product filtering and search functionality
5. Implement shopping cart functionality
