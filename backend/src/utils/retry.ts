export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  attempts = 3,
  initialDelayMs = 500,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt >= attempts) {
        break;
      }

      const delay = initialDelayMs * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(String(lastError ?? "Unknown retry error"));
}
