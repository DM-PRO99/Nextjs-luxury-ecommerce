const nextJest = require('next/jest')

// Proporciona la ruta a tu app Next.js para cargar next.config.js y archivos .env
const createJestConfig = nextJest({
  dir: './',
})

// Configuración personalizada de Jest
const customJestConfig = {
  // Directorio donde Jest buscará los tests
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  
  // Archivos de setup que se ejecutan antes de cada test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Entorno de testing (jsdom simula el navegador)
  testEnvironment: 'jest-environment-jsdom',
  
  // Mapeo de módulos (para resolver alias como @/)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  
  // Ignorar node_modules y .next
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
}

// createJestConfig se exporta de esta manera para asegurar que next/jest
// pueda cargar la configuración de Next.js de forma asíncrona
module.exports = createJestConfig(customJestConfig)
