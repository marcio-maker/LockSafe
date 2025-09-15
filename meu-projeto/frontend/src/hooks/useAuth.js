import { useState, useEffect, useCallback } from 'react'
import { supabase, authService } from '../supabaseClient'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar sessão ao carregar
  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authService.getSession()
        if (session?.user) {
          setUser(session.user)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Ouvir mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true)
        try {
          if (session?.user) {
            setUser(session.user)
            setError(null)
          } else {
            setUser(null)
          }
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Login
  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authService.login(email, password)
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Cadastro
  const signup = useCallback(async (email, password, nome) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authService.signup(email, password, nome)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Logout
  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Redefinir senha
  const resetPassword = useCallback(async (email) => {
    setLoading(true)
    try {
      await authService.resetPassword(email)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user
  }
}