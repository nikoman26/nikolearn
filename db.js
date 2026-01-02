/**
 * NIKOlearn MVP - Direct Database Connection
 * 
 * This module provides direct connection to Supabase PostgreSQL database
 * for database operations, scripts, and direct queries.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection configuration
const config = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  
  // Direct PostgreSQL connection (for scripts)
  db: {
    host: process.env.SUPABASE_DB_HOST || 'db.ntbdgaqpecsynmhmtobb.supabase.co',
    port: parseInt(process.env.SUPABASE_DB_PORT) || 5432,
    database: process.env.SUPABASE_DB_NAME || 'postgres',
    user: process.env.SUPABASE_DB_USER || 'postgres.ntbdgaqpecsynmhmtobb',
    password: process.env.SUPABASE_DB_PASSWORD || 'your_db_password_here',
    ssl: process.env.NODE_ENV === 'production'
  }
};

// Validate required environment variables
const validateConfig = () => {
  const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing environment variables:', missing.join(', '));
    console.warn('Please check your .env file configuration.');
  }
  
  return missing.length === 0;
};

// Main Supabase client (for app use)
export const supabase = createClient(config.url, config.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Service role client (for admin operations)
export const supabaseAdmin = config.serviceRoleKey 
  ? createClient(config.url, config.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Database utilities
export class Database {
  constructor() {
    this.client = supabase;
    this.adminClient = supabaseAdmin;
  }

  // Generic query method
  async query(table, options = {}) {
    let query = this.client.from(table);
    
    if (options.select) {
      query = query.select(options.select);
    } else {
      query = query.select('*');
    }
    
    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    if (options.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending !== false 
      });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Database query error:', error);
      throw error;
    }
    
    return data;
  }

  // Insert method
  async insert(table, data) {
    const { data: result, error } = await this.client
      .from(table)
      .insert(data)
      .select();
    
    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }
    
    return result;
  }

  // Update method
  async update(table, id, data) {
    const { data: result, error } = await this.client
      .from(table)
      .update(data)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Database update error:', error);
      throw error;
    }
    
    return result;
  }

  // Delete method
  async delete(table, id) {
    const { error } = await this.client
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Database delete error:', error);
      throw error;
    }
    
    return true;
  }

  // Raw SQL query method (admin only)
  async rawQuery(sql, params = []) {
    if (!this.adminClient) {
      throw new Error('Admin client not available. Set SUPABASE_SERVICE_ROLE_KEY.');
    }
    
    const { data, error } = await this.adminClient.rpc('exec_sql', {
      query: sql,
      params: params
    });
    
    if (error) {
      console.error('Raw SQL query error:', error);
      throw error;
    }
    
    return data;
  }

  // Helper methods for common operations
  async getUserProfile(userId) {
    return this.query('profiles', {
      filter: { id: userId }
    });
  }

  async getStudentProgress(studentId) {
    return this.query('student_progress', {
      filter: { student_id: studentId },
      order: { column: 'last_accessed', ascending: false }
    });
  }

  async getStudentWallet(studentId) {
    const wallets = await this.query('wallets', {
      filter: { student_id: studentId }
    });
    return wallets[0] || null;
  }

  async getLessonsByGrade(grade) {
    return this.query('lessons', {
      filter: { grade_level: grade, is_published: true }
    });
  }

  async getFamilyLinks(parentId) {
    return this.query('family_links', {
      filter: { parent_id: parentId }
    });
  }

  async getChoresByFamilyLink(familyLinkId) {
    return this.query('chores', {
      filter: { family_link_id: familyLinkId, is_active: true }
    });
  }

  async getQuests() {
    return this.query('quests', {
      filter: { is_active: true },
      order: { column: 'created_at', ascending: false }
    });
  }

  // Transaction method for multiple operations
  async transaction(operations) {
    const results = [];
    
    for (const operation of operations) {
      try {
        const result = await operation();
        results.push({ success: true, data: result });
      } catch (error) {
        results.push({ success: false, error: error.message });
        // Rollback would go here if needed
        break;
      }
    }
    
    return results;
  }
}

// Initialize database instance
export const db = new Database();

// Health check method
export const healthCheck = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy', error: error.message };
    }
    
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Health check error:', error);
    return { status: 'unhealthy', error: error.message };
  }
};

// Export configuration for external use
export const dbConfig = {
  url: config.url,
  anonKey: config.anonKey ? '***hidden***' : null,
  serviceRoleKey: config.serviceRoleKey ? '***hidden***' : null,
  db: {
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    hasPassword: !!config.db.password
  }
};

// Initialize validation
validateConfig();

// Export default
export default db;
