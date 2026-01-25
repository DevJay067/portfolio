# Jay Magar - Portfolio Website

A modern 3D interactive portfolio website with liquid glass effects, built with React, FastAPI, and MongoDB.

## Features

- 🎨 Liquid glass navigation with glassmorphism effects
- 🌟 3D interactive elements and animations
- ✨ Particle background with connected nodes
- 💫 Typing animation effects
- 📱 Fully responsive design
- 🎯 Dark theme with cyan/teal accents
- 🔥 Smooth scroll animations

## Tech Stack

### Frontend
- React 19
- Tailwind CSS
- Lucide React Icons
- Inter Font Family

### Backend
- FastAPI
- MongoDB (Motor)
- Python 3.x

## Local Development

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd jay-magar-portfolio
```

2. Install frontend dependencies
```bash
cd frontend
yarn install
```

3. Install backend dependencies
```bash
cd ../backend
pip install -r requirements.txt
```

4. Set up environment variables

Frontend (.env in /frontend):
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

Backend (.env in /backend):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio
```

5. Run the development servers

Frontend:
```bash
cd frontend
yarn start
```

Backend:
```bash
cd backend
uvicorn server:app --reload --port 8001
```

## Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas account (for production database)

### Steps

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Set up environment variables in Vercel dashboard:
   - `MONGO_URL` - Your MongoDB Atlas connection string
   - `DB_NAME` - Your database name
   - `REACT_APP_BACKEND_URL` - Your Vercel backend URL

4. Deploy
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

### Important Notes

- The `vercel.json` file is already configured for deployment
- Frontend will be deployed as a static site
- Backend will be deployed as serverless functions
- Make sure to update MongoDB connection string to use MongoDB Atlas for production

## Project Structure

```
/app
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── data/         # Mock data
│   │   └── ...
│   └── package.json
├── backend/              # FastAPI backend
│   ├── server.py        # Main server file
│   ├── api/
│   │   └── index.py     # Vercel entry point
│   └── requirements.txt
├── vercel.json          # Vercel configuration
└── README.md
```

## Features Breakdown

### Sections
1. **Hero** - Introduction with 3D profile card and typing animation
2. **Stats** - Animated statistics cards
3. **About** - Bio, contact info, and achievements
4. **Skills** - Filterable skill cards with progress bars
5. **Projects** - Featured projects with images and details
6. **Experience** - Timeline of work history
7. **Education** - Academic background
8. **Contact** - Contact form with social links
9. **Footer** - Links and information

### Interactive Elements
- Smooth scroll navigation
- Category filtering in skills section
- Hover effects on all interactive elements
- Parallax mouse movement on hero section
- Animated particle background
- Form validation (contact form)

## Customization

### Colors
The website uses a cyan/teal color scheme. To customize:
- Edit `tailwind.config.js` for global color changes
- Modify gradient colors in component files

### Content
All content is stored in `/frontend/src/data/mock.js`. Update this file to:
- Change personal information
- Add/remove projects
- Modify skills and experience
- Update contact details

### Images
Replace images in the mock data file with your own:
- Profile image
- Project screenshots
- Background images

## License

MIT License - feel free to use this for your own portfolio!

## Contact

- Email: jaymagar310@gmail.com
- Phone: 7498198688
- Location: Pune, India

---

Built with ❤️ by Jay Magar
