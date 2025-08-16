# Coffee R Us - Admin Portal

A React app for managing coffee products with a simple backend.

## What It Does

- Browse coffee products
- Add, edit, and delete products (admin only)
- Search through products
- Responsive design for mobile and desktop

## Quick Start

### 1. Install Dependencies
```bash
npm install
npm install -g json-server
```

### 2. Start the App (2 terminals)

**Terminal 1 - Backend:**
```bash
json-server --watch public/db.json --port 3001
```

**Terminal 2 - Frontend:**
```bash
npm start
```

App opens at: http://localhost:3000

## How to Use

1. **Home** - Landing page
2. **Shop** - Browse and search coffee products
3. **Admin Portal** - Add, edit, delete products

## Tech Stack

- React 18
- Tailwind CSS
- JSON Server (fake API)
- Jest (testing)

## Testing

```bash
npm test              # Run tests
npm run test:coverage # Test coverage
```

## Common Issues

**Can't start app?**
- Make sure you installed dependencies: `npm install`
- Check if ports 3000/3001 are free

**No data showing?**
- Make sure JSON server is running on port 3001
- Check if `public/db.json` exists

**Styles not working?**
- Restart the development server

## Features Demonstrated

- **React Hooks** - useState, useEffect, custom hooks
- **API Integration** - Fetch data, CRUD operations
- **Form Handling** - Add/edit products with validation
- **Search Functionality** - Real-time filtering
- **Responsive Design** - Works on all devices
- **Testing** - Component and integration tests

---

Built with React and Tailwind CSS ☕️