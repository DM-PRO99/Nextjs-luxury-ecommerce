import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Signin from '@/app/login/page';

// Tipos para los mocks
interface MockSignInResponse {
  ok: boolean;
  error: string | null;
  status: number;
  url: string | null;
}

// Configuración de los mocks
const mockPush = jest.fn();

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Importar después del mock
import { signIn } from 'next-auth/react';
const mockSignIn = signIn as jest.Mock;

describe('LoginForm - Prueba de Integración Completa', () => {
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('permite al usuario hacer login exitoso y redirige a /store', async () => {
    const mockResponse: MockSignInResponse = {
      ok: true,
      error: null,
      status: 200,
      url: '/store',
    };
    mockSignIn.mockResolvedValue(mockResponse)

    const user = userEvent.setup()
    render(<Signin />)

    const emailInput = screen.getByPlaceholderText(/your@email.com/i)
    const passwordInput = screen.getByPlaceholderText(/••••••••/)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      })
    })

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/store')
    })
  })

  it('muestra mensaje de error cuando las credenciales son incorrectas', async () => {
    const mockResponse: MockSignInResponse = {
      ok: false,
      error: 'Invalid credentials',
      status: 401,
      url: null,
    };
    mockSignIn.mockResolvedValue(mockResponse)

    const user = userEvent.setup()
    render(<Signin />)

    await user.type(screen.getByPlaceholderText(/your@email.com/i), 'wrong@example.com')
    await user.type(screen.getByPlaceholderText(/••••••••/), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    const errorMessage = await screen.findByText(/invalid credentials/i)
    expect(errorMessage).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('muestra "Signing in..." mientras procesa el login', async () => {
    mockSignIn.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({ 
          ok: true, 
          error: null, 
          status: 200, 
          url: '/store'
        }), 100)
      )
    )

    const user = userEvent.setup()
    render(<Signin />)

    await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/••••••••/), 'password123')
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    expect(submitButton).toHaveTextContent(/signing in/i)
    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/store')
    }, { timeout: 2000 })
  })

})
