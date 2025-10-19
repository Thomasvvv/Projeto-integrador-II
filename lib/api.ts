// Cliente API para comunicação com o backend Python

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface RespostaAvaliacao {
  pergunta1: boolean
  pergunta2: boolean
  pergunta3: boolean
}

export interface ProgressoAluno {
  nome?: string
  nivel: string
  letras_aprendidas: string[]
  palavras_aprendidas: string[]
  exercicios_completados: number
  modo_avancado_completado: boolean
  silabas_completadas: boolean
  nome_escrito: boolean
}

export interface RespostaExercicio {
  tipo: string
  resposta: string
  correto: boolean
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async avaliarNivel(respostas: RespostaAvaliacao) {
    const response = await fetch(`${this.baseUrl}/api/avaliacao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(respostas),
    })

    if (!response.ok) {
      throw new Error("Erro ao avaliar nível")
    }

    return response.json()
  }

  async obterAlfabeto() {
    const response = await fetch(`${this.baseUrl}/api/alfabeto`)

    if (!response.ok) {
      throw new Error("Erro ao obter alfabeto")
    }

    return response.json()
  }

  async obterLetra(letra: string) {
    const response = await fetch(`${this.baseUrl}/api/alfabeto/${letra}`)

    if (!response.ok) {
      throw new Error("Erro ao obter letra")
    }

    return response.json()
  }

  async obterPalavras() {
    const response = await fetch(`${this.baseUrl}/api/palavras`)

    if (!response.ok) {
      throw new Error("Erro ao obter palavras")
    }

    return response.json()
  }

  async validarExercicio(resposta: RespostaExercicio) {
    const response = await fetch(`${this.baseUrl}/api/exercicio/validar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resposta),
    })

    if (!response.ok) {
      throw new Error("Erro ao validar exercício")
    }

    return response.json()
  }

  async salvarProgresso(alunoId: string, progresso: ProgressoAluno) {
    const response = await fetch(`${this.baseUrl}/api/progresso/salvar?aluno_id=${alunoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progresso),
    })

    if (!response.ok) {
      throw new Error("Erro ao salvar progresso")
    }

    return response.json()
  }

  async obterProgresso(alunoId: string) {
    const response = await fetch(`${this.baseUrl}/api/progresso/${alunoId}`)

    if (!response.ok) {
      throw new Error("Erro ao obter progresso")
    }

    return response.json()
  }

  async gerarExercicioSilabas(palavra: string) {
    const response = await fetch(`${this.baseUrl}/api/silabas/gerar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ palavra }),
    })

    if (!response.ok) {
      throw new Error("Erro ao gerar exercício de sílabas")
    }

    return response.json()
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

