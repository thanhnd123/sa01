
FROM node:18-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
COPY src/ ./src/

RUN npm install -g pnpm
RUN pnpm install

COPY . .

# Build with verbose output
RUN echo "Starting build..." && pnpm run build && echo "Build completed"

# Check build results
RUN ls -la .next/ && echo "Build ID:" && cat .next/BUILD_ID

EXPOSE 3000
CMD ["pnpm", "start"]



# ##dev
# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json pnpm-lock.yaml ./
# COPY src/ ./src/

# RUN npm install -g pnpm
# RUN pnpm install

# COPY . .


# EXPOSE 3000
# # CMD ["tail", "-f", "/dev/null"]
# CMD ["pnpm", "dev"]