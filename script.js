/**
 * SISTEMA DE NAVEGAÇÃO - GITHUB PAGES
 * 
 * Este arquivo gerencia a navegação entre as páginas do sistema
 * Certifique-se de que o arquivo config.js está carregado antes deste
 */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se a configuração foi carregada
    if (!window.SISTEMA_CONFIG || !window.SISTEMA_CONFIG.baseUrl) {
        console.error('❌ Configuração não encontrada! Verifique se o arquivo config.js está carregado.');
        showConfigurationError();
        return;
    }

    // Verifica se a URL foi configurada corretamente
    if (window.SISTEMA_CONFIG.baseUrl.includes('SEU_ID_AQUI')) {
        console.warn('⚠️ URL do sistema ainda não foi configurada. Atualize o arquivo config.js');
        showConfigurationWarning();
        return;
    }

    // Inicialização bem-sucedida
    console.log('✅ Sistema GitHub Pages carregado com sucesso!');
    console.log('🔗 URL do sistema:', window.SISTEMA_CONFIG.baseUrl);
});

/**
 * Função principal de navegação
 * Redireciona para páginas mascaradas do GitHub Pages
 * 
 * @param {string} page - Nome da página (ex: 'Agendamento', 'Admin', etc.)
 */
function navigateTo(page) {
    // Mapeamento de páginas para arquivos HTML locais
    const pageMapping = {
        'Agendamento': 'agendamento.html',
        'Admin': 'admin.html',
        'ListagemAulas': 'listagem.html',
        'GerenciamentoAulas': 'gerenciamento.html'
    };

    // Verifica se a página existe no mapeamento
    if (!pageMapping[page]) {
        console.error(`❌ Página não encontrada: ${page}`);
        alert(`Página "${page}" não encontrada.`);
        return;
    }

    // Obtém o arquivo HTML correspondente
    const targetFile = pageMapping[page];
    
    // Log para debug
    console.log(`🚀 Navegando para: ${page}`);
    console.log(`📄 Arquivo: ${targetFile}`);
    
    // Redireciona para a página mascarada (mesma guia)
    try {
        window.location.href = targetFile;
    } catch (error) {
        console.error('❌ Erro ao navegar:', error);
        alert('Erro ao navegar para a página.');
    }
}

/**
 * Mostra um erro quando a configuração não foi carregada
 */
function showConfigurationError() {
    const container = document.querySelector('.landing-container');
    if (container) {
        container.innerHTML = `
            <div class="hero-section">
                <div class="nav-card-icon">⚠️</div>
                <h1 class="hero-title">Erro de Configuração</h1>
                <p class="hero-subtitle">Arquivo config.js não foi carregado corretamente</p>
            </div>
            <div style="padding: 2rem; text-align: center;">
                <p>Verifique se o arquivo <code>config.js</code> está no mesmo diretório e foi incluído no HTML.</p>
                <button onclick="window.location.reload()" style="
                    background: var(--ctrl-teal-500); 
                    color: white; 
                    border: none; 
                    padding: 0.75rem 1.5rem; 
                    border-radius: 0.5rem; 
                    cursor: pointer;
                    margin-top: 1rem;
                ">Recarregar Página</button>
            </div>
        `;
    }
}

/**
 * Mostra um aviso quando a URL ainda não foi configurada
 */
function showConfigurationWarning() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.innerHTML = `
            <p style="color: var(--ctrl-orange-600); font-weight: 600;">
                ⚠️ ATENÇÃO: Configure a URL do sistema no arquivo config.js
            </p>
            <p class="footer-small">
                Substitua "SEU_ID_AQUI" pela URL real do seu Google Apps Script
            </p>
        `;
    }
}

/**
 * Adiciona funcionalidades extras após o carregamento
 */
window.addEventListener('load', function() {
    // Adiciona animação de entrada para os cards
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Adiciona funcionalidade de teclado (opcional)
    document.addEventListener('keydown', function(event) {
        // Atalhos de teclado (Ctrl + número)
        if (event.ctrlKey) {
            switch(event.key) {
                case '1':
                    event.preventDefault();
                    navigateTo('Agendamento');
                    break;
                case '2':
                    event.preventDefault();
                    navigateTo('Admin');
                    break;
                case '3':
                    event.preventDefault();
                    navigateTo('ListagemAulas');
                    break;
                case '4':
                    event.preventDefault();
                    navigateTo('GerenciamentoAulas');
                    break;
            }
        }
    });
});