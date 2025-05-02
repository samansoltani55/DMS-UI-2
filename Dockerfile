# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install global Angular CLI
RUN npm install -g @angular/cli@15

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose application port
EXPOSE 4200

# Start the Angular development server
CMD ["ng", "serve", "--host", "0.0.0.0"]





# FROM node:10.9.0 as build

# RUN apt-get update && \
#     apt-get install -y python3 make g++ && \
#     npm config set python /usr/bin/python3

# WORKDIR /src

# COPY /dist ./


# FROM nginx:latest

# COPY --from= dist/ /usr/share/nginx/html

# EXPOSE 80
