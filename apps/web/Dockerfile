FROM node:18-alpine AS base
WORKDIR /app

# 2. Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# 3. Copy app source code
COPY . .

# 4. Build the Next.js app
RUN npm run build

# 5. Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -S web-group && adduser -S web-user -G web-group
USER web-user

# Copy built app and dependencies
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# 6. Expose port and run
EXPOSE 3000
CMD ["npm", "run", "start"]