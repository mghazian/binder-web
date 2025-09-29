FROM public.ecr.aws/docker/library/node:24.8-alpine
WORKDIR /app

COPY . .

RUN npm i
RUN chmod -R +x node_modules
CMD npm run start