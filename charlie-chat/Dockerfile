# Use Node.js 18 as base image - using the musl variant
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies, force a clean install
RUN npm cache clean --force && \
    npm install

# Copy the rest of the application
COPY . .

# Explicitly set the Next.js telemetry to disabled to avoid prompts
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]