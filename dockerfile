# Use official Node.js image as the base image
FROM node:20.11.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy env file
# COPY .env.local .env.local

# Build the Next.js application
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# Command to run the Next.js application
CMD ["npm", "run", "start"]
