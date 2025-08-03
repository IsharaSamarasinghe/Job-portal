# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy dependency files and install packages
COPY package*.json ./
RUN npm install

# Copy all your code
COPY . .

# Expose the port (change if you use another port)
EXPOSE 5000

# Start your app
CMD ["node", "server.js"]

RUN mkdir -p /app/temp && \
    chmod -R 777 /app/temp
ENV TEMP_DIR=/app/temp