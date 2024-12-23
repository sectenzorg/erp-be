# Stage 1: Build the application
FROM node:23-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

# Stage 2: Create the final image
FROM node:23-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3100
CMD ["node", "src/app.js"]
