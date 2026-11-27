export interface StreamAiOptions {
  endpoint: string;
  message: string;
  history: { role: string; text: string }[];
  onChunk: (fullTextSoFar: string) => void;
  timeoutMs?: number;
}

/**
 * Sends a prompt to a JECRC Nexus AI endpoint and streams the response progressively.
 * Falls back to standard JSON parsing if the server responds with application/json.
 */
export async function streamAiResponse({
  endpoint,
  message,
  history,
  onChunk,
  timeoutMs = 45000,
}: StreamAiOptions): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, stream: true }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(
        errData?.error ||
          (response.status >= 500
            ? 'Unable to reach Nexus AI right now. Please make sure the backend server is running and try again.'
            : 'Failed to get a response from Nexus AI.')
      );
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/event-stream') || !response.body) {
      const data = await response.json().catch(() => null);
      if (!data?.success || !data?.reply) {
        throw new Error(data?.error || 'Failed to get a response from Nexus AI.');
      }
      onChunk(data.reply);
      return data.reply;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let fullText = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split('\n\n');
      buffer = events.pop() ?? '';

      for (const event of events) {
        const lines = event.split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payloadStr = line.slice(6).trim();
          if (!payloadStr) continue;

          let payload: { chunk?: string; done?: boolean; error?: string };
          try {
            payload = JSON.parse(payloadStr);
          } catch {
            continue;
          }

          if (payload.error) {
            throw new Error(payload.error);
          }
          if (payload.chunk) {
            fullText += payload.chunk;
            onChunk(fullText);
          }
        }
      }
    }

    if (!fullText.trim()) {
      throw new Error('Nexus AI returned an empty response. Please try again.');
    }

    return fullText;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The request timed out. Please try again.');
    }
    if (error instanceof TypeError) {
      throw new Error('Network error: unable to connect to the Nexus AI server.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
