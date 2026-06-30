# Use the official lightweight Node.js 18 image.
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code
COPY . ./

# Service must listen to $PORT environment variable.
ENV PORT=8080
EXPOSE 8080

# Run the web service on container startup.
CMD [ "npm", "start" ]
