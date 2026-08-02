import { INITIAL_SAMPLE_MEDIA } from '../data/sampleFinanceData';

const DB_NAME = 'TradeVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_files';

// Initialize IndexedDB connection
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB Error:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Fetch all media items (Sample data + IndexedDB user items)
export async function getAllMediaItems() {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const userItems = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    // Process user items to recreate object URLs if raw Blob was stored
    const formattedUserItems = userItems.map(item => {
      if (item.fileData && item.fileData instanceof Blob) {
        return {
          ...item,
          fileUrl: URL.createObjectURL(item.fileData)
        };
      }
      return item;
    });

    // Combine sample data with user uploaded items (newest user items first)
    return [...formattedUserItems.reverse(), ...INITIAL_SAMPLE_MEDIA];
  } catch (error) {
    console.warn('Fallback to initial sample media due to IndexedDB issue:', error);
    return INITIAL_SAMPLE_MEDIA;
  }
}

// Save a new media item to IndexedDB
export async function saveMediaItem(itemData, fileBlob) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const newItem = {
      id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: itemData.title,
      type: itemData.type, // 'pdf' | 'image' | 'video'
      category: itemData.category || 'Tổng Hợp',
      author: itemData.author || 'Trader / Bạn',
      description: itemData.description || '',
      fileSize: formatBytes(fileBlob ? fileBlob.size : 0),
      fileType: fileBlob ? fileBlob.type : '',
      uploadDate: new Date().toISOString().split('T')[0],
      market: itemData.market || 'CRYPTO',
      tags: itemData.tags ? itemData.tags.split(',').map(t => t.trim()) : ['Custom Upload'],
      thumbnail: itemData.thumbnailUrl || generateDefaultThumbnail(itemData.type),
      fileData: fileBlob, // Stored directly in IndexedDB as Blob
      fileUrl: fileBlob ? URL.createObjectURL(fileBlob) : '',
      isUserUploaded: true
    };

    await new Promise((resolve, reject) => {
      const request = store.put(newItem);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    return newItem;
  } catch (error) {
    console.error('Failed to save item to IndexedDB:', error);
    throw error;
  }
}

// Delete an item from IndexedDB
export async function deleteMediaItem(id) {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Failed to delete item from IndexedDB:', error);
  }
}

// Utility: format file size bytes
export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Default thumbnails based on type
function generateDefaultThumbnail(type) {
  if (type === 'pdf') return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
  if (type === 'image') return 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80';
  return 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=600&q=80';
}
