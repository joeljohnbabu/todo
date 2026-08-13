FROM nginx:alpine

# Copy local Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets to Nginx html directory
COPY index.html style.css app.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
