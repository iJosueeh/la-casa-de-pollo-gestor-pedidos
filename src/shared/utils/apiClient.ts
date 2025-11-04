const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export const apiClient = {
  async handleResponse<T>(response: Response): Promise<T> {

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();

  },

  buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): URL {

    const url = new URL(`${BACKEND_API_URL}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });

    }

    return url;

  },


  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, options);
  },
  async post<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, options, body);
  },
  async request<T>(method: string, path: string, options?: RequestOptions, body?: unknown): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const url = this.buildUrl(path, params);

    const response = await fetch(url.toString(), {
      ...fetchOptions,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse(response);
  },
};

