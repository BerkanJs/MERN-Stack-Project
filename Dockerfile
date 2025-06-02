# 1. Frontend build
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# 2. Backend build
FROM node:18 AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# 3. Final image
FROM node:18
WORKDIR /app
COPY --from=backend-build /app/backend ./
COPY --from=frontend-build /app/frontend/dist ./public
EXPOSE 5000
CMD ["npm", "run", "dev"]
