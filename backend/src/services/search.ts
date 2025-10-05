import { Client } from '@opensearch-project/opensearch';

let os: Client | undefined;

export async function initSearch(): Promise<void> {
  const node = process.env.OS_URL ?? 'http://127.0.0.1:9200';
  os = new Client({ node });
  try {
    await os.cluster.health();
    console.log('[opensearch] connected');
  } catch (e: any) {
    console.warn('[opensearch] connect failed:', e?.message || e);
    // Non-fatal: backend continues running even if OpenSearch is down
  }
}

export function getSearch(): Client {
  if (!os) throw new Error('OpenSearch not connected');
  return os;
}
