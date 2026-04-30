# Build stage
FROM node:24-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Expose the API port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
