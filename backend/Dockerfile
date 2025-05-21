# Use official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /backend

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (use --production=false if you need devDependencies for building)
RUN npm install

# Copy the rest of the backend code
COPY . .

# Create the uploads directory (for file uploads)
RUN mkdir -p /backend/uploads


# Create the uploads directory (matches your PVC mount)
RUN mkdir -p /backend/uploads

# Set environment variables (override with kubectl secrets/configmaps)
ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server.js"]

