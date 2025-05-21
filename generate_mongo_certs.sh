#!/bin/bash

# =============================================================================
# MongoDB Certificate Generation Script with Internal CA
# =============================================================================
#
# This script generates a proper internal Certificate Authority (CA) and
# SSL/TLS certificates for MongoDB and distributes them to the appropriate
# service directories.
#
# Usage:
#   sudo ./generate_mongo_certs.sh --build <env> --project <project_name> --app-type <app_type>
#
# Arguments:
#   --build    : Required. Specifies the environment
#   <env>      : Required. Must be one of: dev, staging, prod, all
#   --project  : Required. Specifies the project name
#   --app-type : Required. Specifies the application type (2-app or 3-app)
#
# Examples:
#   # Generate certificates for staging environment:
#   sudo ./generate_mongo_certs.sh --build staging --project wizardlawns --app-type 2-app
#
#   # Generate certificates for all environments:
#   sudo ./generate_mongo_certs.sh --build all --project wizardlawns --app-type 2-app
#
# Notes:
#   - Must be run with sudo privileges
#   - Will create and distribute certificates to:
#     ./<env>/<project>_admin/backend/mongo-certs/
#     ./<env>/<project>/backend/mongo-certs/
#     ./<env>/<project>_mongo/mongo-certs/
#   - Existing certificates will be overwritten
# =============================================================================

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
if [ "$1" != "--build" ]; then
    echo -e "${RED}[!] First argument must be '--build'${NC}"
    exit 1
fi

BUILD_ENV=$2
PROJECT=$4
APP_TYPE=$6  # New variable for app type

# Check arguments
if [ "$3" != "--project" ]; then
    echo -e "${RED}[!] Third argument must be '--project'${NC}"
    exit 1
fi

if [ -z "$4" ]; then
    echo -e "${RED}[!] Project name must be specified${NC}"
    exit 1
fi

if [ "$5" != "--app-type" ]; then
    echo -e "${RED}[!] Fifth argument must be '--app-type'${NC}"
    exit 1
fi

if [ "$6" != "2-app" ] && [ "$6" != "3-app" ]; then
    echo -e "${RED}[!] App type must be either '2-app' or '3-app'${NC}"
    exit 1
fi

if [ "$BUILD_ENV" != "dev" ] && [ "$BUILD_ENV" != "staging" ] && [ "$BUILD_ENV" != "prod" ] && [ "$BUILD_ENV" != "all" ]; then
    echo -e "${RED}[!] Build environment must be either 'dev', 'staging', 'prod', or 'all'${NC}"
    exit 1
fi

# Function to print status messages
echo_status() {
    echo -e "${GREEN}[*] $1${NC}"
}

# Function to print permission info
show_perms() {
    echo -e "${BLUE}[PERMS] Directory: $1${NC}"
    ls -la "$1"
    echo -e "${BLUE}[OWNER] Directory owner:${NC}"
    stat -c '%U:%G' "$1"
    echo ""
}

# Function to get DNS name based on environment
get_dns_name() {
    local project=$1
    local env=$2
    local service=$3
    
    if [ "$env" = "prod" ]; then
        echo "${project}_${service}"
    else
        echo "${project}_${env}_${service}"
    fi
}

# Function to create CA configuration
create_ca_config() {
    local project=$1
    
    cat > ca.cnf <<EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
x509_extensions = v3_ca
prompt = no

[req_distinguished_name]
C = US
ST = MN
L = Minneapolis
O = ${project}
OU = Certificate Authority
CN = ${project}-Internal-CA
emailAddress = contact@${project}.com

[v3_req]
basicConstraints = critical,CA:true
keyUsage = critical,keyCertSign,cRLSign
subjectKeyIdentifier = hash

[v3_ca]
basicConstraints = critical,CA:true
keyUsage = critical,keyCertSign,cRLSign
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer:always
EOF
}

# Function to create certificate configs for a specific environment
create_cert_configs() {
    local env=$1
    local project=$2

    # Get DNS names based on environment
    local mongo_dns=$(get_dns_name "$project" "$env" "mongo")
    local backend_dns=$(get_dns_name "$project" "$env" "backend")
    local admin_backend_dns=$(get_dns_name "$project" "$env" "admin_backend")

    # Create MongoDB server certificate config
    cat > mongodb.cnf <<EOF
[req]
default_bits = 4096
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = req_ext

[dn]
C = US
ST = MN
L = Minneapolis
O = ${project}
OU = DevOps
CN = ${mongo_dns}
emailAddress = contact@${project}.com

[req_ext]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = ${mongo_dns}
DNS.3 = ${backend_dns}
DNS.4 = ${admin_backend_dns}
IP.1 = 127.0.0.1
EOF

    # Create client certificate config
    cat > client.cnf <<EOF
[req]
default_bits = 4096
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = req_ext

[dn]
C = US
ST = MN
L = Minneapolis
O = ${project}
OU = DevOps
CN = ${backend_dns}
emailAddress = contact@${project}.com

[req_ext]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = ${mongo_dns}
DNS.3 = ${backend_dns}
DNS.4 = ${admin_backend_dns}
IP.1 = 127.0.0.1
EOF

    # Create extension config for signing certificates
    cat > v3_ext.cnf <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = ${mongo_dns}
DNS.3 = ${backend_dns}
DNS.4 = ${admin_backend_dns}
IP.1 = 127.0.0.1
EOF
}

# Function to generate certificates
generate_certs() {
    local env=$1
    local project=$2

    echo_status "Starting certificate generation process..."
    echo_status "Current working directory: $(pwd)"
    show_perms "."

    echo_status "Removing old mongo-certs directory if it exists..."
    rm -rf mongo-certs
    mkdir -p mongo-certs
    cd mongo-certs

    echo_status "Setting initial directory permissions..."
    chown mongodb:mongodb .
    chmod 700 .
    show_perms "."

    # Create CA configuration
    create_ca_config "$project"

    echo_status "Generating CA private key and certificate..."
    openssl genrsa -out ca.key 4096
    openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -config ca.cnf
    echo_status "Verifying CA certificate..."
    openssl x509 -in ca.crt -text -noout | grep "CA:TRUE"
    show_perms "."

    # Generate configs for this environment
    create_cert_configs "$env" "$project"

    echo_status "Generating MongoDB server private key and CSR..."
    openssl genrsa -out mongodb.key 4096
    openssl req -new -key mongodb.key -out mongodb.csr -config mongodb.cnf
    show_perms "."

    echo_status "Signing MongoDB server certificate with CA..."
    openssl x509 -req -in mongodb.csr \
        -CA ca.crt \
        -CAkey ca.key \
        -CAcreateserial \
        -out mongodb.crt \
        -days 730 \
        -sha256 \
        -extfile v3_ext.cnf
    
    echo_status "Verifying MongoDB server certificate..."
    openssl verify -CAfile ca.crt mongodb.crt
    show_perms "."

    echo_status "Creating PEM file..."
    cat mongodb.crt mongodb.key > mongodb.pem
    show_perms "."

    echo_status "Generating client private key and CSR..."
    openssl genrsa -out client.key 4096
    openssl req -new -key client.key -out client.csr -config client.cnf
    show_perms "."

    echo_status "Signing client certificate with CA..."
    openssl x509 -req -in client.csr \
        -CA ca.crt \
        -CAkey ca.key \
        -CAcreateserial \
        -out client.crt \
        -days 730 \
        -sha256 \
        -extfile v3_ext.cnf
    
    echo_status "Verifying client certificate..."
    openssl verify -CAfile ca.crt client.crt
    show_perms "."

    echo_status "Creating client PEM file..."
    cat client.crt client.key > client.pem
    show_perms "."

    echo_status "Setting MongoDB ownership and permissions..."
    chown mongodb:mongodb *
    chmod 600 *.key
    chmod 644 *.pem
    chmod 644 *.crt
    show_perms "."

    echo_status "Creating CA PEM file..."
    cat ca.crt > ca.pem
    chmod 644 ca.pem
    show_perms "."

    echo_status "Cleaning up temporary files..."
    rm -f mongodb.csr client.csr ca.cnf mongodb.cnf client.cnf v3_ext.cnf
    show_perms "."

    cd ..
}

# Function to distribute certificates for a specific environment
distribute_certs() {
    local env=$1
    local project=$2
    
    echo_status "Distributing certificates for ${env} environment..."
    
    # Create target directories based on app type
    if [ "$APP_TYPE" = "3-app" ]; then
        mkdir -p ./${env}/${project}_admin/backend/mongo-certs
    fi
    mkdir -p ./${env}/${project}/backend/mongo-certs
    mkdir -p ./${env}/${project}_mongo/mongo-certs

    # Copy specific files to each directory
    local dirs=()
    if [ "$APP_TYPE" = "3-app" ]; then
        dirs+=("./${env}/${project}_admin/backend/mongo-certs")
    fi
    dirs+=("./${env}/${project}/backend/mongo-certs" "./${env}/${project}_mongo/mongo-certs")

    for dir in "${dirs[@]}"; do
        cp mongo-certs/*.{crt,key,pem} "$dir/"
        chmod 755 "$dir"
        chmod 644 "$dir"/*.crt
        chmod 600 "$dir"/*.key
        chmod 644 "$dir"/*.pem
        
        # Set ownership based on directory type
        if [[ "$dir" == *"_mongo"* ]]; then
            # MongoDB container needs 999:999
            chown -R 999:999 "$dir"
        else
            # Backend containers use 1000:1000
            chown -R 1000:1000 "$dir"
        fi
        
        show_perms "$dir"
    done
    
    # Create a README file with instructions
    cat > mongo-certs/README.md <<EOF
# MongoDB Certificate Setup

## Certificate Authority
The CA certificate (\`ca.crt\`) needs to be trusted by all clients connecting to MongoDB.

### For Node.js applications
Set the environment variable:
\`\`\`
NODE_EXTRA_CA_CERTS=/path/to/ca.crt
\`\`\`

### For MongoDB clients
Use the \`--tlsCAFile\` option:
\`\`\`
mongo --tls --tlsCAFile=/path/to/ca.crt
\`\`\`

## Certificate Files
- \`ca.crt\`: The Certificate Authority certificate
- \`mongodb.crt\`: Server certificate
- \`mongodb.key\`: Server private key
- \`mongodb.pem\`: Combined server certificate and key
- \`client.crt\`: Client certificate
- \`client.key\`: Client private key
- \`client.pem\`: Combined client certificate and key
- \`ca.pem\`: CA certificate

## Security Notes
- Keep private keys secure
- Distribute the CA certificate to all clients
- Certificates expire in 2 years (730 days)
EOF

    # Copy README to all directories
    for dir in "${dirs[@]}"; do
        cp mongo-certs/README.md "$dir/"
    done
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}[!] Please run with sudo${NC}"
    exit 1
fi

# Main execution
if [ "$BUILD_ENV" = "all" ]; then
    for env in dev staging prod; do
        generate_certs "$env" "$PROJECT"
        distribute_certs "$env" "$PROJECT"
    done
else
    generate_certs "$BUILD_ENV" "$PROJECT"
    distribute_certs "$BUILD_ENV" "$PROJECT"
fi

echo_status "Cleaning up temporary files..."
rm -rf mongo-certs

echo -e "${GREEN}MongoDB certificates have been generated and distributed successfully!${NC}"
if [ "$BUILD_ENV" = "all" ]; then
    echo "Certificate locations for all environments:"
    for env in dev staging prod; do
        echo "Environment: ${env}"
        if [ "$APP_TYPE" = "3-app" ]; then
            echo "  - ./${env}/${PROJECT}_admin/backend/mongo-certs/      (Admin backend)"
        fi
        echo "  - ./${env}/${PROJECT}/backend/mongo-certs/            (Main backend)"
        echo "  - ./${env}/${PROJECT}_mongo/mongo-certs/              (MongoDB container)"
    done
else
    echo "Certificate locations:"
    if [ "$APP_TYPE" = "3-app" ]; then
        echo "  - ./${BUILD_ENV}/${PROJECT}_admin/backend/mongo-certs/      (Admin backend)"
    fi
    echo "  - ./${BUILD_ENV}/${PROJECT}/backend/mongo-certs/            (Main backend)"
    echo "  - ./${BUILD_ENV}/${PROJECT}_mongo/mongo-certs/              (MongoDB container)"
fi

echo -e "${GREEN}Important next steps:${NC}"
echo "1. In your Node.js application, make sure to set NODE_EXTRA_CA_CERTS environment variable"
echo "2. Update your MongoDB connection string to use the new certificates"