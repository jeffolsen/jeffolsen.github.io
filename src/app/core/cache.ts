import { Service } from '@angular/core';
import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

interface CacheDb extends DBSchema {
  entries: {
    key: string;
    value: CacheEntry<unknown>;
  };
}

const DB_NAME = 'app-cache';
const STORE_NAME = 'entries';

@Service()
export class Cache {
  private dbPromise: Promise<IDBPDatabase<CacheDb>> | undefined;

  private db(): Promise<IDBPDatabase<CacheDb>> {
    this.dbPromise ??= openDB<CacheDb>(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
    return this.dbPromise;
  }

  async get<T>(key: string): Promise<T | undefined> {
    const db = await this.db();
    const entry = (await db.get(STORE_NAME, key)) as CacheEntry<T> | undefined;
    if (!entry) {
      return undefined;
    }
    if (Date.now() >= entry.expiresAt) {
      await db.delete(STORE_NAME, key);
      return undefined;
    }
    return entry.value;
  }

  async set<T>(key: string, value: T, ttlMs: number): Promise<void> {
    const db = await this.db();
    const entry: CacheEntry<T> = { value, expiresAt: Date.now() + ttlMs };
    await db.put(STORE_NAME, entry, key);
  }
}
