# Getting Started with Create React App

"build": "cd client && npm run build",
"client": "npm start --prefix client",
"dev": "concurrently \"nodemon server.js\" \"cd client && npm run start\"",
"develop": "concurrently --kill-others-on-fail \"npm run server\" \"npm run start --prefix client\"",
"gogo": "git status && git add . && git commit -m 'autoDeploy' && git push",
"heroku-postbuild": "npm run install-client && npm run build",
"install-client": "cd client && npm install",
"install": "cd client && npm install",
"path": "^0.12.7",
"seed": "node scripts/seedsDB.js",
"server": "nodemon server.js",
"start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run start --prefix client\"",
"test": "echo \"Error: no test specified\" && exit 1",
