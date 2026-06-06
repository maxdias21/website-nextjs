const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },

    /**
     * Proxy reverso para o backend Django em desenvolvimento.
     *
     * PROBLEMA QUE RESOLVE:
     * Em desenvolvimento, o Next.js roda em localhost:3000 e o Django em
     * localhost:8000. Fazer fetch direto para o Django causa cross-origin,
     * e o browser descarta cookies com SameSite=Lax entre origens diferentes.
     *
     * COMO FUNCIONA:
     * Qualquer requisição para /django/qualquer-coisa/ é interceptada pelo
     * Next.js e redirecionada internamente para o Django.
     * Para o browser, tudo parece vir de localhost:3000 (mesma origem).
     * Isso permite que os cookies HttpOnly persistam normalmente.
     *
     * EXEMPLO:
     * fetch("/django/login/")
     *   → Next.js redireciona para → http://127.0.0.1:8000/api/login/
     *   → browser não sabe, acha que é localhost:3000
     *   → cookie é salvo e persiste no F5 ✅
     *
     * EM PRODUÇÃO:
     * Usar Nginx para fazer o mesmo middleware, ou colocar tudo no mesmo domínio.
     * Exemplo: seusite.com/django/ → Django | seusite.com/ → Next.js
     */
    async rewrites() {
        return [
            {
                // source: rota que o Next.js intercepta
                // :path* captura tudo após /django/ (ex: login/, perfil/1/)
                source: "/django/:path*",

                // destination: para onde o Next.js redireciona internamente
                // :path* é substituído pelo valor capturado no source
                destination: "http://127.0.0.1:8000/api/:path*/",
            },
        ];
    },
};

export default nextConfig;