<script>

window.onload = function() {
	// Pega a URL completa
	var url = new URL(window.location);
	var urlRedirect = '';
	var clickcounter = url.searchParams.get('clickcounter');
	var gacategory = url.searchParams.get('gacategory');
	var gaaction = url.searchParams.get('gaaction');
	var galabel = url.searchParams.get('galabel');
	
	// Prepara os endereços para redirecionamento
	var arRedirects = new Object();
  
  // Adicione as URLs completas
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
				// Grava o evento do Google Analitycs
				if (gacategory != null && gaaction != null && galabel != null) {
					// Se estiver usando o analytics.js
					//ga('send', 'event', gacategory, gaaction, galabel, 1);
					
					// Se estiver usando o gtag.js
					gtag('event', gaaction, {
					   'event_label': galabel,
					   'event_category': gacategory,
					   'non_interaction': true
					});
				}
				
				// Redireciona o usuário para a página de destino após 2 segundos
				setTimeout(function() {
					window.location.href = arRedirects[type];
				}, 2000);

				break;
			}
		}
	}
}

</script>
