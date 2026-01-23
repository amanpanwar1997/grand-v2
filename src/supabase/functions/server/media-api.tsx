/**
 * MEDIA API - Media Library Management
 */

import { Hono } from 'npm:hono';
import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const BUCKET_NAME = 'make-9c8e64e4-media';

interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: 'image' | 'video' | 'document' | 'other';
  mimeType: string;
  size: number;
  url: string;
  signedUrl?: string;
  path: string;
  folder: string;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
}

/**
 * Initialize Supabase Storage bucket
 */
async function initBucket() {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 52428800 // 50MB
      });
      console.log(`Bucket created: ${BUCKET_NAME}`);
    }
    
    return supabase;
  } catch (error) {
    console.error('Error initializing bucket:', error);
    throw error;
  }
}

/**
 * Get all media files
 */
export async function getAllMedia(c: Context) {
  try {
    const filesData = await kv.getByPrefix('media:file:');
    const files = filesData.map((item: any) => item.value);
    
    // Generate signed URLs for private files
    const supabase = await initBucket();
    
    for (const file of files) {
      if (file.path) {
        const { data } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(file.path, 3600); // 1 hour
        
        if (data) {
          file.signedUrl = data.signedUrl;
        }
      }
    }
    
    return c.json({
      success: true,
      count: files.length,
      files: files.sort((a: any, b: any) => 
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )
    });
  } catch (error: any) {
    console.error('Error getting media:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Upload file
 */
export async function uploadFile(c: Context) {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';
    const uploadedBy = formData.get('uploadedBy') as string || 'admin';
    
    if (!file) {
      return c.json({
        success: false,
        error: 'No file provided'
      }, 400);
    }
    
    // Initialize Supabase
    const supabase = await initBucket();
    
    // Generate unique filename
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
    const path = `${folder}/${filename}`;
    
    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: false
      });
    
    if (error) {
      throw error;
    }
    
    // Determine file type
    let fileType: 'image' | 'video' | 'document' | 'other' = 'other';
    if (file.type.startsWith('image/')) fileType = 'image';
    else if (file.type.startsWith('video/')) fileType = 'video';
    else if (file.type.includes('pdf') || file.type.includes('document')) fileType = 'document';
    
    // Get signed URL
    const { data: signedData } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(path, 3600);
    
    // Create media record
    const mediaFile: MediaFile = {
      id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: filename,
      originalName: file.name,
      type: fileType,
      mimeType: file.type,
      size: file.size,
      url: signedData?.signedUrl || '',
      path,
      folder,
      uploadedAt: new Date().toISOString(),
      uploadedBy,
      tags: []
    };
    
    // Save to KV store
    await kv.set(`media:file:${mediaFile.id}`, mediaFile);
    
    console.log(`File uploaded: ${file.name} -> ${path}`);
    
    return c.json({
      success: true,
      message: 'File uploaded successfully',
      file: mediaFile
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Delete file
 */
export async function deleteFile(c: Context) {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'File ID is required'
      }, 400);
    }
    
    const file = await kv.get(`media:file:${id}`);
    
    if (!file) {
      return c.json({
        success: false,
        error: 'File not found'
      }, 404);
    }
    
    // Delete from Supabase Storage
    const supabase = await initBucket();
    await supabase.storage
      .from(BUCKET_NAME)
      .remove([file.path]);
    
    // Delete from KV store
    await kv.del(`media:file:${id}`);
    
    console.log(`File deleted: ${file.name}`);
    
    return c.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Rename file
 */
export async function renameFile(c: Context) {
  try {
    const { id, newName } = await c.req.json();
    
    if (!id || !newName) {
      return c.json({
        success: false,
        error: 'File ID and new name are required'
      }, 400);
    }
    
    const file = await kv.get(`media:file:${id}`);
    
    if (!file) {
      return c.json({
        success: false,
        error: 'File not found'
      }, 404);
    }
    
    file.originalName = newName;
    await kv.set(`media:file:${id}`, file);
    
    console.log(`File renamed: ${file.name} -> ${newName}`);
    
    return c.json({
      success: true,
      message: 'File renamed successfully',
      file
    });
  } catch (error: any) {
    console.error('Error renaming file:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update file metadata (tags, folder, etc.)
 */
export async function updateFileMetadata(c: Context) {
  try {
    const { id, ...updates } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'File ID is required'
      }, 400);
    }
    
    const file = await kv.get(`media:file:${id}`);
    
    if (!file) {
      return c.json({
        success: false,
        error: 'File not found'
      }, 404);
    }
    
    const updated = { ...file, ...updates };
    await kv.set(`media:file:${id}`, updated);
    
    console.log(`File metadata updated: ${id}`);
    
    return c.json({
      success: true,
      message: 'File metadata updated',
      file: updated
    });
  } catch (error: any) {
    console.error('Error updating file metadata:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get folders
 */
export async function getFolders(c: Context) {
  try {
    const filesData = await kv.getByPrefix('media:file:');
    const files = filesData.map((item: any) => item.value);
    
    const folders = [...new Set(files.map((f: any) => f.folder))];
    
    const folderStats = folders.map(folder => ({
      name: folder,
      count: files.filter((f: any) => f.folder === folder).length
    }));
    
    return c.json({
      success: true,
      folders: folderStats
    });
  } catch (error: any) {
    console.error('Error getting folders:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get storage stats
 */
export async function getStorageStats(c: Context) {
  try {
    const filesData = await kv.getByPrefix('media:file:');
    const files = filesData.map((item: any) => item.value);
    
    const totalSize = files.reduce((acc: number, f: any) => acc + (f.size || 0), 0);
    const imageCount = files.filter((f: any) => f.type === 'image').length;
    const videoCount = files.filter((f: any) => f.type === 'video').length;
    const docCount = files.filter((f: any) => f.type === 'document').length;
    
    return c.json({
      success: true,
      stats: {
        totalFiles: files.length,
        totalSize,
        imageCount,
        videoCount,
        docCount
      }
    });
  } catch (error: any) {
    console.error('Error getting storage stats:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}