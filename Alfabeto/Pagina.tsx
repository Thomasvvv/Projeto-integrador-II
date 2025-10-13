"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

const alfabeto = [
  { letra: "A", palavra: "AVIÃO", imagem: "✈️" },
  { letra: "B", palavra: "BOLA", imagem: "⚽" },
  { letra: "C", palavra: "CASA", imagem: "🏠" },
  { letra: "D", palavra: "DADO", imagem: "🎲" },
  { letra: "E", palavra: "ELEFANTE", imagem: "🐘" },
  { letra: "F", palavra: "FLOR", imagem: "🌸" },
  { letra: "G", palavra: "GATO", imagem: "🐱" },
  { letra: "H", palavra: "HOTEL", imagem: "🏨" },
  { letra: "I", palavra: "IGREJA", imagem: "⛪" },
  { letra: "J", palavra: "JANELA", imagem: "🪟" },
  { letra: "K", palavra: "KIWI", imagem: "🥝" },
  { letra: "L", palavra: "LIVRO", imagem: "📚" },
  { letra: "M", palavra: "MAÇÃ", imagem: "🍎" },
  { letra: "N", palavra: "NAVIO", imagem: "🚢" },
  { letra: "O", palavra: "OVO", imagem: "🥚" },
  { letra: "P", palavra: "PATO", imagem: "🦆" },
  { letra: "Q", palavra: "QUEIJO", imagem: "🧀" },
  { letra: "R", palavra: "RATO", imagem: "🐭" },
  { letra: "S", palavra: "SOL", imagem: "☀️" },
  { letra: "T", palavra: "TREM", imagem: "🚂" },
  { letra: "U", palavra: "UVA", imagem: "🍇" },
  { letra: "V", palavra: "VACA", imagem: "🐄" },
  { letra: "W", palavra: "WI-FI", imagem: "📶" },
  { letra: "X", palavra: "XÍCARA", imagem: "☕" },
  { letra: "Y", palavra: "YOGA", imagem: "🧘" },
  { letra: "Z", palavra: "ZEBRA", imagem: "🦓" },
]

export default function AprendizadoAlfabeto() {
  const [letraAtual, setLetraAtual] = useState(0)

  const letra = alfabeto[letraAtual]

  const falarLetra = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(`Letra ${letra.letra} de ${letra.palavra}`)
      utterance.lang = "pt-BR"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const proximaLetra = () => {
    if (letraAtual < alfabeto.length - 1) {
      setLetraAtual(letraAtual + 1)
    }
  }

  const letraAnterior = () => {
    if (letraAtual > 0) {
      setLetraAtual(letraAtual - 1)
    }
  }

  const progresso = ((letraAtual + 1) / alfabeto.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400">
      <div className="w-full max-w-6xl space-y-6">
        <Card className="p-6 shadow-lg bg-white/95 backdrop-blur border-2 border-pink-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Aprendendo o Alfabeto
              </h2>
              <span className="text-xl font-semibold text-orange-600">
                {letraAtual + 1} / {alfabeto.length}
              </span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500 rounded-full"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-12 shadow-2xl bg-white/95 backdrop-blur border-2 border-rose-200">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="text-[12rem] md:text-[16rem] font-bold bg-gradient-to-br from-pink-600 to-orange-600 bg-clip-text text-transparent leading-none">
                {letra.letra}
              </div>
              <Button
                onClick={falarLetra}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-xl border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white rounded-xl bg-white transform hover:scale-105 transition-all"
              >
                <Volume2 className="w-12 h-12 mr-3" />
                Ouvir a Letra
              </Button>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-8 rounded-2xl border-2 border-pink-200 space-y-4">
              <div className="text-8xl">{letra.imagem}</div>
              <p className="text-4xl md:text-5xl font-bold text-gray-800">{letra.palavra}</p>
              <p className="text-2xl text-gray-600">
                {letra.letra} de {letra.palavra}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={letraAnterior}
                disabled={letraAtual === 0}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-xl border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white rounded-xl disabled:opacity-50 bg-white"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                Letra Anterior
              </Button>

              <Button
                onClick={proximaLetra}
                disabled={letraAtual === alfabeto.length - 1}
                size="lg"
                className="px-12 py-6 text-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                Próxima Letra
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>

            {letraAtual === alfabeto.length - 1 && (
              <Link href="/exercicios">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 py-8 text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-2xl shadow-lg mt-4 transform hover:scale-105 transition-all"
                >
                  Fazer Exercícios do Alfabeto
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
