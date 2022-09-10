
	const linkPortaleModificaCliente= "./PortaleModificaCliente.html";
	const linkPortaleCreazioneCliente= "./PortaleCreazioneCliente.html";

	const btnCreateProfile = document.getElementById("btnCreateProfile")
	const btnModifyProfile = document.getElementById("btnModifyProfile")

	btnCreateProfile.addEventListener("click", function(){
		window.location.href=linkPortaleCreazioneCliente	
	})
	
	btnModifyProfile.addEventListener("click", function(){
		window.location.href=linkPortaleModificaCliente	
	})

