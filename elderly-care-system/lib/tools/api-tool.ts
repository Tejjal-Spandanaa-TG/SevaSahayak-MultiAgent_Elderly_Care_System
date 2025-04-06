/**
 * API Tool for SevaSahayak Agents
 *
 * This tool allows agents to interact with external APIs and services.
 * It provides a standardized interface for making HTTP requests.
 */

export interface ApiRequestOptions {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  params?: Record<string, string>
  body?: any
  timeout?: number
  retries?: number
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  headers: Record<string, string>
  error?: string
}

export class ApiTool {
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number
  private defaultRetries: number

  constructor(defaultHeaders: Record<string, string> = {}, defaultTimeout = 10000, defaultRetries = 3) {
    this.defaultHeaders = defaultHeaders
    this.defaultTimeout = defaultTimeout
    this.defaultRetries = defaultRetries
  }

  /**
   * Make an API request
   */
  async request<T = any>(options: ApiRequestOptions): Promise<ApiResponse<T>> {
    const {
      url,
      method,
      headers = {},
      params = {},
      body,
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
    } = options

    // Build URL with query parameters
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value)
    })

    const fullUrl = `${url}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`

    // Merge headers
    const mergedHeaders = {
      "Content-Type": "application/json",
      ...this.defaultHeaders,
      ...headers,
    }

    // Configure request
    const requestOptions: RequestInit = {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : undefined,
    }

    // Implement retry logic
    let lastError: Error | null = null
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        // Add timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)
        requestOptions.signal = controller.signal

        // Make the request
        const response = await fetch(fullUrl, requestOptions)
        clearTimeout(timeoutId)

        // Parse response headers
        const responseHeaders: Record<string, string> = {}
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value
        })

        // Parse response data
        let data: T
        const contentType = response.headers.get("content-type")
        if (contentType?.includes("application/json")) {
          data = await response.json()
        } else {
          data = (await response.text()) as unknown as T
        }

        return {
          data,
          status: response.status,
          headers: responseHeaders,
        }
      } catch (error) {
        lastError = error

        // If it's not a timeout error or it's the last attempt, don't retry
        if (error.name !== "AbortError" || attempt === retries - 1) {
          break
        }

        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 100))
      }
    }

    return {
      data: null as T,
      status: 0,
      headers: {},
      error: lastError?.message || "Unknown error occurred",
    }
  }

  /**
   * Shorthand for GET requests
   */
  async get<T = any>(
    url: string,
    params: Record<string, string> = {},
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "GET",
      params,
      headers,
    })
  }

  /**
   * Shorthand for POST requests
   */
  async post<T = any>(url: string, body: any, headers: Record<string, string> = {}): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "POST",
      body,
      headers,
    })
  }

  /**
   * Shorthand for PUT requests
   */
  async put<T = any>(url: string, body: any, headers: Record<string, string> = {}): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "PUT",
      body,
      headers,
    })
  }

  /**
   * Shorthand for DELETE requests
   */
  async delete<T = any>(url: string, headers: Record<string, string> = {}): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "DELETE",
      headers,
    })
  }
}

// Create and export a singleton instance
export const apiTool = new ApiTool()

