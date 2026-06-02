import { z } from 'zod';

export async function fetchJson<T>(
    url: string,
    schema: z.ZodType<T>,
): Promise<T> {
    const response = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok)
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);

    const data = await response.json();

    const result = schema.safeParse(data);

    if (!result.success)
        throw new Error('Invalid response format', result.error);

    return result.data;
}