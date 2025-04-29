#FROM node:20.10.0 AS builder
#WORKDIR /major
#
#COPY package.json package-lock.json ./
#RUN npm install
#
#COPY . .
#RUN npm run ci
#RUN npm run build
#
#FROM node:20.10.0 AS runner
#WORKDIR /major
#
#COPY --from=builder /major/.next ./.next
#COPY --from=builder /major/public ./public
#COPY --from=builder /major/package.json ./package.json
#COPY --from=builder /major/node_modules ./node_modules
#
#EXPOSE 3000
#
#CMD ["npm", "start"]

FROM node:20.10.0 AS builder
WORKDIR /major

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.10.0 AS runner
WORKDIR /major

COPY --from=builder /major/.next ./.next
COPY --from=builder /major/public ./public
COPY --from=builder /major/node_modules ./node_modules
COPY --from=builder /major/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
