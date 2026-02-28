type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: Record<string, unknown>;
  error?: { message: string; stack?: string };
}

function formatEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
    entry.context ? `[${entry.context}]` : '',
    entry.message,
  ].filter(Boolean);

  let line = parts.join(' ');

  if (entry.data) {
    line += ` ${JSON.stringify(entry.data)}`;
  }

  if (entry.error) {
    line += ` | Error: ${entry.error.message}`;
    if (entry.error.stack) {
      line += `\n${entry.error.stack}`;
    }
  }

  return line;
}

function createEntry(level: LogLevel, message: string, context?: string, data?: Record<string, unknown>, error?: Error): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    data,
    error: error ? { message: error.message, stack: error.stack } : undefined,
  };
}

export function createLogger(context: string) {
  return {
    debug(message: string, data?: Record<string, unknown>) {
      if (process.env.NODE_ENV === 'production') return;
      const entry = createEntry('debug', message, context, data);
      console.debug(formatEntry(entry));
    },
    info(message: string, data?: Record<string, unknown>) {
      const entry = createEntry('info', message, context, data);
      console.info(formatEntry(entry));
    },
    warn(message: string, data?: Record<string, unknown>) {
      const entry = createEntry('warn', message, context, data);
      console.warn(formatEntry(entry));
    },
    error(message: string, error?: Error, data?: Record<string, unknown>) {
      const entry = createEntry('error', message, context, data, error ?? undefined);
      console.error(formatEntry(entry));
    },
  };
}
