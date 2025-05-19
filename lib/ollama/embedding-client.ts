/**
 * Ollama Embedding Client for SevaSahayak
 *
 * This client provides an interface to generate embeddings using Ollama models.
 * It supports text embedding for semantic search and similarity comparisons.
 */

export interface EmbeddingRequestOptions {
  model: string
  prompt: string
}

export interface EmbeddingResponse {
  embedding: number[]
  model: string
}

export class OllamaEmbeddingClient {
  private baseUrl: string
  private defaultModel: string

  constructor(baseUrl = "http://localhost:11434", defaultModel = "nomic-embed-text") {
    this.baseUrl = baseUrl
    this.defaultModel = defaultModel
  }

  /**
   * Generate embeddings for a text using the Ollama API
   */
  async generateEmbedding(options: Partial<EmbeddingRequestOptions>): Promise<EmbeddingResponse> {
    const requestOptions: EmbeddingRequestOptions = {
      model: options.model || this.defaultModel,
      prompt: options.prompt || "",
    }

    try {
      // In a real implementation, this would call the Ollama API
      // For demo purposes, we're simulating the response
      console.log(`Generating embedding with model: ${requestOptions.model}`)
      console.log(`Text: ${requestOptions.prompt}`)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Generate a mock embedding vector (normally this would come from Ollama)
      const mockEmbedding = Array.from({ length: 384 }, () => Math.random() * 2 - 1)

      return {
        embedding: mockEmbedding,
        model: requestOptions.model,
      }
    } catch (error) {
      console.error("Error generating embedding:", error)
      throw new Error(`Failed to generate embedding: ${error.message}`)
    }
  }

  /**
   * Calculate cosine similarity between two embedding vectors
   */
  calculateSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) {
      throw new Error("Embedding vectors must have the same dimension")
    }

    // Calculate dot product
    let dotProduct = 0
    let magnitude1 = 0
    let magnitude2 = 0

    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i]
      magnitude1 += embedding1[i] * embedding1[i]
      magnitude2 += embedding2[i] * embedding2[i]
    }

    magnitude1 = Math.sqrt(magnitude1)
    magnitude2 = Math.sqrt(magnitude2)

    // Cosine similarity
    return dotProduct / (magnitude1 * magnitude2)
  }

  /**
   * Get available embedding models from Ollama
   */
  async getAvailableEmbeddingModels(): Promise<string[]> {
    try {
      // In a real implementation, this would call the Ollama API to list models
      // For demo purposes, we're returning a fixed list
      return ["nomic-embed-text", "all-minilm:l6-v2", "e5-small-v2"]
    } catch (error) {
      console.error("Error getting available embedding models:", error)
      throw new Error(`Failed to get available embedding models: ${error.message}`)
    }
  }
}

// Create and export a singleton instance
export const ollamaEmbeddingClient = new OllamaEmbeddingClient()

