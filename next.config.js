const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimización para Docker (reduce el tamaño de la imagen significativamente)
}

module.exports = nextConfig
