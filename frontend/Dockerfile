FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/Zoa/frontend
COPY package*.json ./
RUN npm install
COPY . .
COPY ./Switch/Switch.d.ts ./node_modules/@mui/material/Switch/Switch.d.ts
RUN npm run build


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/Zoa/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/Zoa/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]