print('Starting MongoDB initialization...');

function sleep(ms) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + ms);
}

function tryAuth(maxAttempts = 5, delayMs = 2000) {
    print(`Attempting to authenticate as root (max ${maxAttempts} attempts)...`);
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            print(`Authentication attempt ${attempt}/${maxAttempts}`);
            // Use the root credentials from MONGO_INITDB variables
            db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);
            print('Successfully authenticated as root');
            return true;
        } catch (error) {
            print(`Authentication attempt ${attempt} failed: ${error.message}`);
            if (attempt < maxAttempts) {
                print(`Waiting ${delayMs}ms before next attempt...`);
                sleep(delayMs);
            }
        }
    }
    return false;
}

try {
    // Switch to admin database first
    db = db.getSiblingDB('admin');
    
    // Try to authenticate with retries
    if (!tryAuth()) {
        throw new Error('Failed to authenticate after maximum attempts');
    }

    // Create the application database
    print(`Creating main application database: ${process.env.DB_NAME}`);
    db = db.getSiblingDB(process.env.DB_NAME);
    
    // Switch back to admin to create users
    // You create the users in the admin database and then grant them privileges
    // in the downstream databases so you can have 1 credential set for all databases
    db = db.getSiblingDB('admin');
    
    // Create main application user with readWrite permissions
    print('Creating main application user...');
    try {
        db.createUser({
            user: process.env.MONGO_APP_USERNAME,
            pwd: process.env.MONGO_APP_PASSWORD,
            roles: [
                { role: "readWrite", db: process.env.DB_NAME }
            ]
        });
        print('Main application user created successfully');
    } catch (userError) {
        // If user already exists, that's okay
        if (userError.code !== 51003) { // DuplicateKey
            throw userError;
        }
        print('Main application user already exists');
    }

    // Create monitoring user
    print('Creating monitoring user...');
    try {
        db.createUser({
            user: process.env.MONGO_MONITORING_USERNAME,
            pwd: process.env.MONGO_MONITORING_PASSWORD,
            roles: [
                { role: "clusterMonitor", db: "admin" },
                { role: "read", db: process.env.DB_NAME }
            ]
        });
        print('Monitoring user created successfully');
    } catch (monitorUserError) {
        if (monitorUserError.code !== 51003) { // DuplicateKey
            throw monitorUserError;
        }
        print('Monitoring user already exists');
    }

} catch (error) {
    print('Error during initialization:', error);
    throw error;
}

print('MongoDB initialization completed successfully');
