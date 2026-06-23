'use client'

import { supabase } from '@/lib/supabase'

export default function Teste() {

  async function inserirCliente() {

    const { data, error } = await supabase
      .from('clientes')
      .insert([
        {
          nome: 'Nicolas',
          telefone: '11999999999'
        }
      ])

    console.log(data)
    console.log(error)
  }

  return (
    <button onClick={inserirCliente}>
      Inserir Cliente
    </button>
  )
}