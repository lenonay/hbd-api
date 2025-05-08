FROM node:23-alpine

WORKDIR /app

# Copiar el codigo
COPY . .

RUN npm i

EXPOSE 9999

RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

RUN chown -R appuser:appuser /app

USER appuser

CMD ["node", "app.js"]