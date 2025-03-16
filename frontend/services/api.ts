export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface CreateProdutoDTO {
  nome: string;
  preco: number;
  quantidade: number;
}

export interface UpdateProdutoDTO {
  nome?: string;
  preco?: number;
  quantidade?: number;
}

const API_URL = "http://localhost:3000";

export const produtosApi = {
  getAll: async (): Promise<Produto[]> => {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) {
      throw new Error("Falha ao buscar produtos");
    }
    return response.json();
  },

  getById: async (id: number): Promise<Produto> => {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    if (!response.ok) {
      throw new Error(`Falha ao buscar produto ${id}`);
    }
    return response.json();
  },

  create: async (produto: CreateProdutoDTO): Promise<Produto> => {
    const response = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) {
      throw new Error("Falha ao criar produto");
    }
    return response.json();
  },

  update: async (id: number, produto: UpdateProdutoDTO): Promise<Produto> => {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) {
      throw new Error(`Falha ao atualizar produto ${id}`);
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Falha ao excluir produto ${id}`);
    }
  },
};
