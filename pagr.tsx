"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, SkipForward } from "lucide-react"
import Link from "next/link"

export default function AvaliacaoInicial() {
  const [etapa, setEtapa] = useState<"video" | "resultado">("video")
  const [respostas, setRespostas] = useState<boolean[]>([])
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [videoPausado, setVideoPausado] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const temposPausa = [10, 20, 30, 40]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("[v0] Autoplay bloqueado pelo navegador:", error)
      })
    }
  }, [])

  useEffect(() => {
    if (etapa === "video" && videoRef.current) {
      const video = videoRef.current

      const handleTimeUpdate = () => {
        const tempoAtual = video.currentTime
        const tempoPergunta = temposPausa[perguntaAtual]

        if (tempoPergunta && tempoAtual >= tempoPergunta && !videoPausado) {
          video.pause()
          setVideoPausado(true)
        }
      }

      video.addEventListener("timeupdate", handleTimeUpdate)
      return () => video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [etapa, perguntaAtual, videoPausado, temposPausa])

  const responder = (resposta: boolean) => {
    const novasRespostas = [...respostas, resposta]
    setRespostas(novasRespostas)

    if (perguntaAtual < temposPausa.length - 1) {
      setPerguntaAtual(perguntaAtual + 1)
      setVideoPausado(false)
      videoRef.current?.play()
    } else {
      setEtapa("resultado")
    }
  }

  const pularVideo = () => {
    window.location.href = "/alfabeto"
  }

  const calcularNivel = () => {
    const acertos = respostas.filter((r) => r).length
    const percentual = (acertos / respostas.length) * 100

    if (percentual <= 50) {
      return {
        nivel: "iniciante",
        titulo: "Vamos começar do início!",
        descricao: "Você vai aprender o alfabeto com atividades práticas e divertidas.",
        proximaRota: "/alfabeto",
      }
    } else {
      return {
        nivel: "intermediario",
        titulo: "Você já sabe algumas coisas!",
        descricao: "Vamos praticar a leitura e escrita de palavras e frases.",
        proximaRota: "/leitura",
      }
    }
  }

  if (etapa === "video") {
    const progresso = ((perguntaAtual + 1) / temposPausa.length) * 100

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
        <Card className="w-full max-w-5xl p-6 md:p-10 shadow-2xl bg-white/95 backdrop-blur">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-3 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-purple-700">
                    Pergunta {perguntaAtual + 1} de {temposPausa.length}
                  </span>
                  <span className="text-xl font-semibold text-blue-600">{Math.round(progresso)}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
              <Button
                onClick={pularVideo}
                variant="outline"
                size="lg"
                className="ml-6 px-6 py-6 text-lg font-semibold border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors bg-white"
              >
                <SkipForward className="w-6 h-6 mr-2" />
                Pular Vídeo
              </Button>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden aspect-video relative shadow-xl">
              <video ref={videoRef} className="w-full h-full object-cover" controls={false} playsInline autoPlay muted>
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 text-blue-400 text-4xl">▶</div>
                    </div>
                    <p className="text-white text-xl">Vídeo de avaliação</p>
                    <p className="text-white/70 text-sm">O vídeo pausará automaticamente após cada pergunta</p>
                  </div>
                </div>
              </video>
            </div>

            {videoPausado && (
              <div className="space-y-4">
                <p className="text-center text-xl md:text-2xl font-semibold text-gray-800">
                  Responda a pergunta que acabou de ouvir:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button
                    onClick={() => responder(true)}
                    size="lg"
                    className="py-12 text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl shadow-lg group transform hover:scale-105 transition-all"
                  >
                    <Check className="w-12 h-12 mr-4 group-hover:scale-110 transition-transform" />
                    SIM
                  </Button>
                  <Button
                    onClick={() => responder(false)}
                    size="lg"
                    className="py-12 text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-2xl shadow-lg group transform hover:scale-105 transition-all"
                  >
                    <X className="w-12 h-12 mr-4 group-hover:scale-110 transition-transform" />
                    NÃO
                  </Button>
                </div>
              </div>
            )}

            {!videoPausado && (
              <div className="text-center">
                <p className="text-xl text-purple-700 animate-pulse font-semibold">Assista com atenção...</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    )
  }

  const resultado = calcularNivel()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <Card className="w-full max-w-4xl p-8 md:p-12 shadow-2xl bg-white/95 backdrop-blur">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-balance">
              {resultado.titulo}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 text-balance">{resultado.descricao}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-purple-200 space-y-4">
            <p className="text-xl text-gray-700">
              Você respondeu {respostas.filter((r) => r).length} de {respostas.length} perguntas com "Sim"
            </p>
          </div>

          <Link href={resultado.proximaRota}>
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-8 text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Começar a Aprender
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
