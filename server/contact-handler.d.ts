export function readJsonBody(req: AsyncIterable<Uint8Array> & { body?: unknown }): Promise<unknown>;

export function processContactSubmission(input: {
  body: unknown;
  env: Record<string, string | undefined>;
  clientIp: string;
}): Promise<{
  ok: boolean;
  status: number;
  body: {
    ok: boolean;
    error?: string;
  };
}>;

export function getClientIpFromRequest(req: {
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string | undefined };
}): string;
