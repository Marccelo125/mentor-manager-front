import axios from 'axios'
import { cpfFormat } from './cpfFormat'
import type { EditMentorType } from '@/types/EditMentorType'
import type { PaginationType } from '@/types/PaginationType'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function doGetQuery(query: string) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    }

    const response = await client.get(`mentors/?name=${query}`, config)
    const { data } = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function doGet(url: string): Promise<PaginationType | null> {
  try {
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    }

    const apiResponse = await client.get(url, config)

    const { data } = apiResponse.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function doRegister(name: string, email: string, password: string) {
  try {
    const response = await client.post('/register', {
      name,
      email,
      password
    })

    if (response.status === 201) {
      await login(email, password)
      return true
    }

    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await client.post('/login', {
      email,
      password
    })

    if (response.status === 200) {
      const { token } = response.data

      sessionStorage.setItem('token', token)
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function newMentor(name: string, email: string, cpf: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }

    cpf = cpfFormat(cpf)

    const response = await client.post(
      '/mentors',
      {
        name,
        email,
        cpf
      },
      config
    )

    if (response.status === 200) {
      return true
    }

    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function editMentor(
  id: number,
  newName?: string | null,
  newEmail?: string | null,
  newCpf?: string | null
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }

    const params: EditMentorType = {
      id: id,
      name: null,
      email: null,
      cpf: null
    }

    if (newName) {
      params.name = newName
    }
    if (newEmail) {
      params.email = newEmail
    }
    if (newCpf) {
      params.cpf = cpfFormat(newCpf)
    }

    const response = await client.put(`/mentors/${id}`, params, config)

    if (response.status === 200) {
      return true
    }

    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function deleteMentor(id: number) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }
    const response = await client.delete(`/mentors/${id}`, config)

    if (response.status === 200) {
      return true
    }

    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function logout() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }
    const response = await client.delete('/logout', config)
    console.log(response)

    if (response.status === 200) {
      sessionStorage.clear()
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}
