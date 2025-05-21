FROM mongo:latest

# Create SSL directory with proper permissions
RUN mkdir -p /etc/ssl/mongo && \
    mkdir -p /docker-entrypoint-initdb.d && \
    chown -R 999:999 /etc/ssl/mongo /docker-entrypoint-initdb.d && \
    chmod 755 /etc/ssl/mongo /docker-entrypoint-initdb.d

# Copy initialization script only
COPY --chown=999:999 init-db.js /docker-entrypoint-initdb.d/

# Set proper permissions
RUN chmod 644 /docker-entrypoint-initdb.d/init-db.js

USER mongodb

# Remove the CMD line - let docker-compose handle it 