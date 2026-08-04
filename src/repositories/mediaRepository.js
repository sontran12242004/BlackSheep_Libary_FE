import { INITIAL_SAMPLE_MEDIA } from '../data/sampleFinanceData';
import { getStoredItems, saveStoredItem, deleteStoredItem } from '../services/storageService';

/**
 * MediaRepository — domain data layer that handles merging static sample data
 * with dynamic IndexedDB items and constructing domain objects.
 */

export async function fetchAllMediaItems() {
  try {
    const userItems = await getStoredItems();

    const formattedUserItems = userItems.map(item => {
      if (item.fileData && item.fileData instanceof Blob) {
        return {
          ...item,
          fileUrl: URL.createObjectURL(item.fileData)
        };
      }
      return item;
    });

    return [...formattedUserItems.reverse(), ...INITIAL_SAMPLE_MEDIA];
  } catch (error) {
    console.warn('[mediaRepository] Fallback to sample media due to storage error:', error);
    return INITIAL_SAMPLE_MEDIA;
  }
}

export async function createMediaItem(itemData, fileBlob) {
  const newItem = {
    id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title: itemData.title,
    titleEn: itemData.titleEn || itemData.title,
    type: itemData.type,
    category: itemData.category || 'Tổng Hợp',
    author: itemData.author || 'Trader / Bạn',
    description: itemData.description || '',
    fileSize: formatBytes(fileBlob ? fileBlob.size : 0),
    fileType: fileBlob ? fileBlob.type : '',
    uploadDate: new Date().toISOString().split('T')[0],
    market: itemData.market || 'CRYPTO',
    tags: Array.isArray(itemData.tags) 
      ? itemData.tags 
      : (itemData.tags ? itemData.tags.split(',').map(t => t.trim()) : ['Custom Upload']),
    thumbnail: itemData.thumbnail || itemData.thumbnailUrl || generateDefaultThumbnail(itemData.type),
    fileData: fileBlob,
    fileUrl: itemData.fileUrl || (fileBlob ? URL.createObjectURL(fileBlob) : ''),
    fileUrlEn: itemData.fileUrlEn || '',
    isVip: Boolean(itemData.isVip),
    targetRole: itemData.targetRole || (itemData.isVip ? 'vip' : 'all'),
    isRecap: Boolean(itemData.isRecap),
    hasDualLanguage: Boolean(itemData.hasDualLanguage),
    isUserUploaded: true
  };

  await saveStoredItem(newItem);
  return newItem;
}

export async function updateMediaItem(item) {
  await saveStoredItem(item);
}

export async function removeMediaItem(id) {
  await deleteStoredItem(id);
}

export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function generateDefaultThumbnail(type) {
  if (type === 'pdf') return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
  if (type === 'image') return 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80';
  return 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=600&q=80';
}
