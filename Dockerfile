# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /usr/src

COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]