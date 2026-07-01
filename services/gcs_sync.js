const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const bucketName = process.env.GCS_BUCKET_NAME || 'run-sources-capston-project-2-europe-west1';
const remoteFileName = 'db/routine_assistant.db';
const localFilePath = path.join(__dirname, '../routine_assistant.db');

let storage;
let bucket;
let file;
let localDbGeneration = null;

try {
  storage = new Storage();
  bucket = storage.bucket(bucketName);
  file = bucket.file(remoteFileName);
  console.log(`GCS Sync initialized with bucket: ${bucketName}`);
} catch (err) {
  console.warn('GCS Storage client could not be initialized. GCS sync will be disabled.', err.message);
}

// Download DB from GCS if remote exists and is newer
async function downloadDb() {
  if (!file) return false;
  try {
    const [exists] = await file.exists();
    if (!exists) {
      console.log('No database file found on GCS yet.');
      return false;
    }

    const [metadata] = await file.getMetadata();
    const gcsGen = metadata.generation;

    if (gcsGen !== localDbGeneration) {
      console.log(`Downloading fresh database from GCS. Generation: ${gcsGen}`);
      await file.download({ destination: localFilePath });
      localDbGeneration = gcsGen;
      console.log('Database downloaded successfully.');
      return true;
    }
  } catch (err) {
    console.error('Failed to download DB from GCS:', err.message);
  }
  return false;
}

// Upload DB to GCS and update cached generation
async function uploadDb() {
  if (!file) return false;
  try {
    if (!fs.existsSync(localFilePath)) {
      console.warn('Local database file does not exist, skipping upload.');
      return false;
    }
    console.log(`Uploading database to GCS...`);
    const [uploadedFile] = await bucket.upload(localFilePath, {
      destination: remoteFileName,
      metadata: {
        cacheControl: 'no-cache',
      }
    });
    const [metadata] = await uploadedFile.getMetadata();
    localDbGeneration = metadata.generation;
    console.log(`Database uploaded successfully. New GCS Generation: ${localDbGeneration}`);
    return true;
  } catch (err) {
    console.error('Failed to upload DB to GCS:', err.message);
  }
  return false;
}

// Check GCS metadata and sync if needed before read/write operations
async function syncIfNeeded() {
  if (!file) return false;
  try {
    const [exists] = await file.exists();
    if (!exists) return false;

    const [metadata] = await file.getMetadata();
    if (metadata.generation !== localDbGeneration) {
      return await downloadDb();
    }
  } catch (err) {
    console.error('Error during GCS generation check:', err.message);
  }
  return false;
}

module.exports = {
  downloadDb,
  uploadDb,
  syncIfNeeded
};
