<script>

window.onload = function() {
	// Pega a URL completa
	var url = new URL(window.location);
	var clickcounter = url.searchParams.get('clickcounter');
	var gacategory = url.searchParams.get('gacategory');
	var gaaction = url.searchParams.get('gaaction');
	var galabel = url.searchParams.get('galabel');
	
	// Cria um evento padrão se as variáveis não estiverem preenchidas
	if (gacategory == null) {
		gacategory = 'Contador';
	}
	if (gaaction == null) {
		gaaction = 'Click';
	}
	if (galabel == null) {
		galabel = clickcounter;
	}
	
	// 1 segundo
	var redirect_timeout = 1000;
	
	// Prepara os endereços para redirecionamento
	var arRedirects = new Object();
	arRedirects['whatsapp'] = 'https://api.whatsapp.com/send?phone=55';
	arRedirects['facebook'] = 'https://www.facebook.com/';
	arRedirects['instagram'] = 'https://www.instagram.com/';
	arRedirects['youtube'] = 'https://www.youtube.com/channel/';
	arRedirects['github'] = 'https://github.com/';
	arRedirects['linkedin'] = 'https://www.linkedin.com/';
	
	// Verifica se o parâmetro de redirecionamento foi passado na URL
	if (clickcounter != null) {
		for(var type in arRedirects)
		{
			if (clickcounter == type) {
				// Grava o evento do Google Analitycs e redireciona
				if (typeof gtag === 'function') {
					// Se estiver usando o gtag.js
					gtag('event', gaaction, {
						'event_label': galabel,
						'event_category': gacategory,
						'non_interaction': true,
						'event_callback': function() {
							setTimeout(function() {
								window.location.href = arRedirects[type];
							}, redirect_timeout);

						}
					});
				} else if (typeof ga === 'function') {
					// Se estiver usando o analytics.js
					ga('send', 'event', {
						'eventCategory': gacategory,
						'eventAction': gaaction,
						'eventLabel': galabel,
						'hitCallback': function() {
							setTimeout(function() {
								window.location.href = arRedirects[type];
							}, redirect_timeout);

						}
					});
				} else {
					setTimeout(function() {
						window.location.href = arRedirects[type];
					}, redirect_timeout);
				}
				
				// Garante que o usuário administrador vai redirecionar
				// Necessário pois o Google Analytics não contabiliza usuários administradores
				setTimeout(function() {
					window.location.href = arRedirects[type];
				}, redirect_timeout*3);

				break;
			}
		}
	}
}

</script>
