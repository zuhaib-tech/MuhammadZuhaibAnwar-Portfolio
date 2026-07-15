FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY pages/ pages/
COPY components/ components/
COPY styles/ styles/
COPY public/ public/
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm","start"]
