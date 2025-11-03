# Use Node.js official image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 80

# Start the app
CMD ["node", "server.js"]
