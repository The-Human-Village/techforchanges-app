# Install dependencies only when needed
FROM node:18.13.0-alpine as build

ARG STAGE
ARG RELEASE
ARG NODE_ENV=production
ENV STAGE $STAGE
ENV RELEASE $RELEASE
ENV CI true

WORKDIR /opt/app

COPY . .

RUN yarn workspaces focus --production

RUN mkdir prod_modules && mv ./node_modules/* ./prod_modules

RUN yarn workspaces focus

ENV NEXT_TELEMETRY_DISABLED 1

RUN NODE_ENV=${NODE_ENV} yarn run build

FROM node:18.13.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /opt/app

COPY --from=build /opt/app/yarn.lock ./
COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/prod_modules ./node_modules
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/.next/standalone ./
COPY --from=build /opt/app/.next/static ./.next/static

EXPOSE 80

CMD ["node", "server"]
