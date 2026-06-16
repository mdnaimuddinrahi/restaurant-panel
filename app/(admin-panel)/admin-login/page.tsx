'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import './login.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLoginMutation } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function page() {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('12345678')
  // const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shake, setShake] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', error: false })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [login, { data, isLoading, isError, isSuccess, error: errorResponse }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!toast.visible) return
    const timer = window.setTimeout(() => setToast(current => ({ ...current, visible: false })), 3000)
    return () => window.clearTimeout(timer)
  }, [toast.visible])

  const isEmailValid = useMemo(() => emailRegex.test(email.trim()), [email])
  const isPasswordValid = useMemo(() => password.trim().length > 0, [password])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = {
      email: !isEmailValid ? 'Enter a valid email address.' : '',
      password: !isPasswordValid ? 'Password is required.' : '',
    }

    setErrors(nextErrors)

    if (nextErrors.email || nextErrors.password) {
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
      return
    }

    try {
      const response = await login({ email, password }).unwrap()
      console.log('Login successful:', response)
      localStorage.setItem('token', response.access_token)
      document.cookie = `token=${response.access_token}; path=/`;
      localStorage.setItem('auth', JSON.stringify({
          accessToken: response.access_token,
          user: response.user,
      }))
      dispatch(
        setCredentials({
          token: response.access_token,
          user: response.user,
        })
      );
      router.push('/admin')

    } catch (error) {
      setToast({ visible: true, message: 'Invalid email or password.', error: true })
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setToast({ visible: true, message: 'Signed in successfully — redirecting…', error: false })
      setEmail('admin2@gmail.com')
      setPassword('admin1234')
      // setRemember(false)
    }, 1400)
  }

  return (
    <div className="page-root min-h-screen bg-nx-bg text-nx-text">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        
          <main className={`relative overflow-hidden rounded-[32px] ${shake ? 'shake' : ''}`}>
            <div className="absolute inset-0 hero-overlay" />
            <div className="relative card-inner border border-nx-border bg-white p-8 sm:p-10">
              <div className="mb-8 text-center">
                <h1 className="mt-4 text-3xl font-display font-bold">Restaurant Admin</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-nx-muted mb-1.5 tracking-wide uppercase">Email address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nx-muted">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16v16H4z" stroke="none" />
                        <path d="M3 7l9 6 9-6" />
                        <path d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1z" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@nexus.io"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      className={`nx-input w-full bg-nx-surface-2 border rounded-2xl pl-11 pr-4 py-3 text-sm placeholder:text-nx-muted/60 outline-none ${errors.email ? 'border-rose-500/70' : 'border-nx-border'}`}
                    />
                  </div>
                  <p className={`field-error text-xs text-rose-400 mt-1.5 ${errors.email ? 'show' : ''}`}>
                    {errors.email || 'Enter a valid email address.'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-xs font-semibold text-nx-muted tracking-wide uppercase">Password</label>
                    <a href="/admin/forgot-password" className="text-xs text-nx-cyan hover:text-nx-violet transition-colors">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nx-muted">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="11" width="16" height="9" rx="2" />
                        <path d="M8 11V7a4 4 0 018 0v4" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      className={`nx-input w-full bg-nx-surface-2 border rounded-2xl pl-11 pr-11 py-3 text-sm placeholder:text-nx-muted/60 outline-none ${errors.password ? 'border-rose-500/70' : 'border-nx-border'}`}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-nx-muted hover:text-nx-cyan transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {showPassword ? (
                          <>
                            <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a18.5 18.5 0 014.22-5.06" />
                            <path d="M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 7 11 7a18.5 18.5 0 01-2.16 2.94" />
                            <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                            <path d="M1 1l22 22" />
                          </>
                        ) : (
                          <>
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                  <p className={`field-error text-xs text-rose-400 mt-1.5 ${errors.password ? 'show' : ''}`}>
                    {errors.password || 'Password is required.'}
                  </p>
                </div>

                {/* <div className="flex items-center gap-3 pt-1">
                  <label htmlFor="remember" className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      checked={remember}
                      onChange={event => setRemember(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="flex h-5 w-5 items-center justify-center rounded-xl border border-nx-border bg-nx-surface-2 peer-checked:bg-nx-cyan peer-checked:border-nx-cyan transition-colors">
                      <svg className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-sm text-nx-muted group-hover:text-nx-text transition-colors">Remember me</span>
                  </label>
                </div> */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="nx-btn w-full bg-gradient-to-r from-nx-cyan via-nx-violet to-nx-pink text-gray-900 font-display font-bold text-sm rounded-2xl py-3 mt-2 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <span className="spinner" ><AiOutlineLoading3Quarters /></span> : 'Sign In'}
                </button>
              </form>

            </div>
          </main>
        </div>

      {toast.visible && (
        <div className={`toast fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border bg-nx-surface px-5 py-3 text-sm text-nx-text shadow-2xl ${toast.error ? 'border-rose-500/40' : 'border-nx-border'} show`}>
          <div className="flex items-center gap-2.5">
            <svg className="h-5 w-5 text-nx-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <style jsx global>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        html,
        body {
          min-height: 100%;
          margin: 0;
          font-family: Inter, sans-serif;
        }

        body {
          background-color: #f4f6fb;
          background-image:
            radial-gradient(circle at 15% 20%, rgba(6, 182, 212, 0.10), transparent 35%),
            radial-gradient(circle at 85% 75%, rgba(99, 102, 241, 0.10), transparent 40%),
            linear-gradient(rgba(15,23,42,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.025) 1px, transparent 1px);
          background-size: auto, auto, 42px 42px, 42px 42px;
        }

        .bg-nx-bg { background-color: #f4f6fb; }
        .text-nx-text { color: #1e2a3b; }
        .bg-nx-surface { background: #ffffff; }
        .bg-nx-surface-2 { background: #f3f5fb; }
        .border-nx-border { border-color: #e3e8f5; }
        .text-nx-muted { color: #94a1b8; }
        .bg-nx-cyan { background-color: #06b6d4; }
        .bg-nx-violet { background-color: #6366f1; }
        .bg-nx-pink { background-color: #ec4899; }
        .text-nx-cyan { color: #06b6d4; }
        .text-nx-violet { color: #6366f1; }

        .panel-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(6, 182, 212, 0.16), transparent 30%);
          pointer-events: none;
        }

        .panel-bubble {
          background: radial-gradient(circle, rgba(236, 72, 153, 0.18), transparent 55%);
          filter: blur(20px);
        }

        .hero-overlay {
          background: linear-gradient(180deg, rgba(255,255,255,0.64), rgba(255,255,255,0));
        }

        .card-inner {
          position: relative;
          z-index: 1;
          border-radius: 21px;
          background: #ffffff;
          box-shadow: 0 20px 60px -15px rgba(30, 41, 59, 0.12);
        }

        .nx-input {
          transition: box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
        }

        .nx-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 1px rgba(6, 182, 212, 0.25), 0 0 16px rgba(6, 182, 212, 0.18);
          background-color: #ffffff;
        }

        .nx-btn {
          transition: transform 0.15s ease, box-shadow 0.25s ease, filter 0.25s ease;
          box-shadow: 0 8px 24px -4px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.1);
        }

        .nx-btn:hover {
          box-shadow: 0 10px 30px -4px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.15);
          filter: brightness(1.03);
        }

        .nx-btn:active {
          transform: scale(0.985);
        }

        .nx-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
        }

        .logo-glow {
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.35));
        }

        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }

        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        .field-error {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease;
        }

        .field-error.show {
          max-height: 2rem;
        }

        .spinner {
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #ffffff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin-loader 0.6s linear infinite;
        }

        @keyframes spin-loader {
          to { transform: rotate(360deg); }
        }

        .toast {
          transform: translateY(120%);
          opacity: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }

        .toast.show {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
