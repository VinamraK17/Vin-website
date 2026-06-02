# Use Node.js LTS as the base image
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy package file
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application (write dummy server if build fails to keep container running for debugging)
RUN npm run build > build.log 2>&1 || (mkdir -p dist && echo "console.log('Build failed. Please open the terminal in Dockhand and run: cat /app/build.log'); setInterval(() => {}, 1000);" > dist/server.cjs)

# --- Production Image ---
FROM node:20-slim

WORKDIR /app

# Install openssl (required for Prisma client)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy built assets and server from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
# Copy portfolio.html if it's used outside dist
COPY --from=builder /app/portfolio.html ./portfolio.html
COPY --from=builder /app/build.log* ./


# Expose the application port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
