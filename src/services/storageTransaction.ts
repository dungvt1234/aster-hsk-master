export type WritableStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** localStorage has no native transactions; restore previous entries if a write fails. */
export function writeStorageEntries(storage: WritableStorage, entries: Record<string, string>): void {
  const previous = Object.entries(entries).map(([key]) => [key, storage.getItem(key)] as const);
  try {
    for (const [key, value] of Object.entries(entries)) storage.setItem(key, value);
  } catch {
    try {
      // Remove new values first to release space before restoring the snapshot.
      for (const [key] of previous) storage.removeItem(key);
      for (const [key, value] of previous) if (value !== null) storage.setItem(key, value);
    } catch {
      throw new Error('Không ghi được dữ liệu và chưa khôi phục đủ bản cũ. Hãy giữ tệp sao lưu để khôi phục.');
    }
    throw new Error('Không đủ dung lượng hoặc trình duyệt không cho lưu. Dữ liệu cũ đã được khôi phục.');
  }
}
