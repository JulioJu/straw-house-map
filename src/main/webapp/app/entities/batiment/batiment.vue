<template>
  <div>
    <h2 id="page-heading" data-cy="BatimentHeading">
      <span v-text="$t('cartoPaillePorteuseApp.batiment.home.title')" id="batiment-heading">Batiments</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('cartoPaillePorteuseApp.batiment.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'BatimentCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-batiment"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('cartoPaillePorteuseApp.batiment.home.createLabel')"> Create a new Batiment </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && batiments && batiments.length === 0">
      <span v-text="$t('cartoPaillePorteuseApp.batiment.home.notFound')">No batiments found</span>
    </div>
    <div class="table-responsive" v-if="batiments && batiments.length > 0">
      <table class="table table-striped" aria-describedby="batiments">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('latitude')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.latitude')">Latitude</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'latitude'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('longitude')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.longitude')">Longitude</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'longitude'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('nomBatiment')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.nomBatiment')">Nom Batiment</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nomBatiment'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photoPrincipale')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photoPrincipale')">Photo Principale</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photoPrincipale'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photoPrincipaleLegende')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photoPrincipaleLegende')">Photo Principale Legende</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photoPrincipaleLegende'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photoPrincipaleDescription')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photoPrincipaleDescription')">Photo Principale Description</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'photoPrincipaleDescription'"
              ></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo1')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo1')">Photo 1</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo1'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo1Legende')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo1Legende')">Photo 1 Legende</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo1Legende'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo1Description')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo1Description')">Photo 1 Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo1Description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo2')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo2')">Photo 2</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo2'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo2Legende')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo2Legende')">Photo 2 Legende</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo2Legende'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo2Description')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo2Description')">Photo 2 Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo2Description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo3')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo3')">Photo 3</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo3'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo3Legende')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo3Legende')">Photo 3 Legende</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo3Legende'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo3Description')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo3Description')">Photo 3 Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo3Description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo4')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo4')">Photo 4</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo4'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo4Legende')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo4Legende')">Photo 4 Legende</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo4Legende'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo4Description')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo4Description')">Photo 4 Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo4Description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo5')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo5')">Photo 5</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo5'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo5Legende')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo5Legende')">Photo 5 Legende</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo5Legende'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('photo5Description')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.photo5Description')">Photo 5 Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo5Description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('usageBatiment')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.usageBatiment')">Usage Batiment</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'usageBatiment'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('usageBatimentInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.usageBatimentInfos')">Usage Batiment Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'usageBatimentInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('cout')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.cout')">Cout</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cout'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('surfacePlancher')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.surfacePlancher')">Surface Plancher</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'surfacePlancher'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('niveaux')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.niveaux')">Niveaux</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'niveaux'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travauxNeuf')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.travauxNeuf')">Travaux Neuf</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travauxNeuf'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travauxExtension')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.travauxExtension')">Travaux Extension</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travauxExtension'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travauxRenov')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.travauxRenov')">Travaux Renov</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travauxRenov'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travauxIte')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.travauxIte')">Travaux Ite</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travauxIte'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travauxIti')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.travauxIti')">Travaux Iti</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travauxIti'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('constructionDebut')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.constructionDebut')">Construction Debut</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'constructionDebut'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('constructionFin')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.constructionFin')">Construction Fin</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'constructionFin'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bottesTaille')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.bottesTaille')">Bottes Taille</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bottesTaille'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bottesTailleInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.bottesTailleInfos')">Bottes Taille Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bottesTailleInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bottesDensite')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.bottesDensite')">Bottes Densite</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bottesDensite'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bottesCereale')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.bottesCereale')">Bottes Cereale</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bottesCereale'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('distanceAppro')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.distanceAppro')">Distance Appro</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'distanceAppro'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('autoconstruction')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.autoconstruction')">Autoconstruction</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'autoconstruction'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('participatif')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.participatif')">Participatif</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'participatif'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('structCompl')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.structCompl')">Struct Compl</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'structCompl'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('structComplNature')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.structComplNature')">Struct Compl Nature</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'structComplNature'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('structComplInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.structComplInfos')">Struct Compl Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'structComplInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('longMaxSansMurRefend')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.longMaxSansMurRefend')">Long Max Sans Mur Refend</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'longMaxSansMurRefend'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('noteCalcul')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.noteCalcul')">Note Calcul</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'noteCalcul'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('nbrRangDeBottes')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.nbrRangDeBottes')">Nbr Rang De Bottes</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nbrRangDeBottes'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('integBaie')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.integBaie')">Integ Baie</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'integBaie'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('integBaieInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.integBaieInfos')">Integ Baie Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'integBaieInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('supportAncrage')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.supportAncrage')">Support Ancrage</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'supportAncrage'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('supportAncrageInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.supportAncrageInfos')">Support Ancrage Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'supportAncrageInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('revetInt')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.revetInt')">Revet Int</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'revetInt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('revetIntInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.revetIntInfos')">Revet Int Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'revetIntInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('revetExt')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.revetExt')">Revet Ext</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'revetExt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('revetExtInfos')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.revetExtInfos')">Revet Ext Infos</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'revetExtInfos'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('maitreDOuvrage')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.maitreDOuvrage')">Maitre D Ouvrage</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'maitreDOuvrage'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('maitreDOeuvre')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.maitreDOeuvre')">Maitre D Oeuvre</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'maitreDOeuvre'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('architecte')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.architecte')">Architecte</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'architecte'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bureauDEtudeStructure')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.bureauDEtudeStructure')">Bureau D Etude Structure</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bureauDEtudeStructure'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bureauControl')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.bureauControl')">Bureau Control</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bureauControl'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entrepriseBottes')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.entrepriseBottes')">Entreprise Bottes</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entrepriseBottes'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entrepriseCharpente')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.entrepriseCharpente')">Entreprise Charpente</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entrepriseCharpente'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entrepriseEnduits')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.entrepriseEnduits')">Entreprise Enduits</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entrepriseEnduits'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('descriptionProjet')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.descriptionProjet')">Description Projet</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'descriptionProjet'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('difficultees')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.difficultees')">Difficultees</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'difficultees'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('astuces')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.astuces')">Astuces</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'astuces'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('divers')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.divers')">Divers</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'divers'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('contactNom')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.contactNom')">Contact Nom</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'contactNom'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('contactMail')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.contactMail')">Contact Mail</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'contactMail'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('contactPhone')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.contactPhone')">Contact Phone</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'contactPhone'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('codePostal')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.codePostal')">Code Postal</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'codePostal'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('profilPublic')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.profilPublic')">Profil Public</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'profilPublic'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('conditionsAcceptees')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.conditionsAcceptees')">Conditions Acceptees</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'conditionsAcceptees'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdDate')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.createdDate')">Created Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('lastModifiedDate')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.lastModifiedDate')">Last Modified Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lastModifiedDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdBy.login')">
              <span v-text="$t('cartoPaillePorteuseApp.batiment.createdBy')">Created By</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdBy.login'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="batiment in batiments" :key="batiment.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'BatimentView', params: { batimentId: batiment.id } }">{{ batiment.id }}</router-link>
            </td>
            <td>{{ batiment.latitude }}</td>
            <td>{{ batiment.longitude }}</td>
            <td>{{ batiment.nomBatiment }}</td>
            <td>
              <a v-if="batiment.photoPrincipale" v-on:click="openFile(batiment.photoPrincipaleContentType, batiment.photoPrincipale)">
                <img
                  v-bind:src="'data:' + batiment.photoPrincipaleContentType + ';base64,' + batiment.photoPrincipale"
                  style="max-height: 30px"
                  alt="batiment image"
                />
              </a>
              <span v-if="batiment.photoPrincipale"
                >{{ batiment.photoPrincipaleContentType }}, {{ byteSize(batiment.photoPrincipale) }}</span
              >
            </td>
            <td>{{ batiment.photoPrincipaleLegende }}</td>
            <td>{{ batiment.photoPrincipaleDescription }}</td>
            <td>
              <a v-if="batiment.photo1" v-on:click="openFile(batiment.photo1ContentType, batiment.photo1)">
                <img
                  v-bind:src="'data:' + batiment.photo1ContentType + ';base64,' + batiment.photo1"
                  style="max-height: 30px"
                  alt="batiment image"
                />
              </a>
              <span v-if="batiment.photo1">{{ batiment.photo1ContentType }}, {{ byteSize(batiment.photo1) }}</span>
            </td>
            <td>{{ batiment.photo1Legende }}</td>
            <td>{{ batiment.photo1Description }}</td>
            <td>
              <a v-if="batiment.photo2" v-on:click="openFile(batiment.photo2ContentType, batiment.photo2)">
                <img
                  v-bind:src="'data:' + batiment.photo2ContentType + ';base64,' + batiment.photo2"
                  style="max-height: 30px"
                  alt="batiment image"
                />
              </a>
              <span v-if="batiment.photo2">{{ batiment.photo2ContentType }}, {{ byteSize(batiment.photo2) }}</span>
            </td>
            <td>{{ batiment.photo2Legende }}</td>
            <td>{{ batiment.photo2Description }}</td>
            <td>
              <a v-if="batiment.photo3" v-on:click="openFile(batiment.photo3ContentType, batiment.photo3)">
                <img
                  v-bind:src="'data:' + batiment.photo3ContentType + ';base64,' + batiment.photo3"
                  style="max-height: 30px"
                  alt="batiment image"
                />
              </a>
              <span v-if="batiment.photo3">{{ batiment.photo3ContentType }}, {{ byteSize(batiment.photo3) }}</span>
            </td>
            <td>{{ batiment.photo3Legende }}</td>
            <td>{{ batiment.photo3Description }}</td>
            <td>
              <a v-if="batiment.photo4" v-on:click="openFile(batiment.photo4ContentType, batiment.photo4)">
                <img
                  v-bind:src="'data:' + batiment.photo4ContentType + ';base64,' + batiment.photo4"
                  style="max-height: 30px"
                  alt="batiment image"
                />
              </a>
              <span v-if="batiment.photo4">{{ batiment.photo4ContentType }}, {{ byteSize(batiment.photo4) }}</span>
            </td>
            <td>{{ batiment.photo4Legende }}</td>
            <td>{{ batiment.photo4Description }}</td>
            <td>
              <a v-if="batiment.photo5" v-on:click="openFile(batiment.photo5ContentType, batiment.photo5)">
                <img
                  v-bind:src="'data:' + batiment.photo5ContentType + ';base64,' + batiment.photo5"
                  style="max-height: 30px"
                  alt="batiment image"
                />
              </a>
              <span v-if="batiment.photo5">{{ batiment.photo5ContentType }}, {{ byteSize(batiment.photo5) }}</span>
            </td>
            <td>{{ batiment.photo5Legende }}</td>
            <td>{{ batiment.photo5Description }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.UsageBatiment.' + batiment.usageBatiment)">{{ batiment.usageBatiment }}</td>
            <td>{{ batiment.usageBatimentInfos }}</td>
            <td>{{ batiment.cout }}</td>
            <td>{{ batiment.surfacePlancher }}</td>
            <td>{{ batiment.niveaux }}</td>
            <td>{{ batiment.travauxNeuf }}</td>
            <td>{{ batiment.travauxExtension }}</td>
            <td>{{ batiment.travauxRenov }}</td>
            <td>{{ batiment.travauxIte }}</td>
            <td>{{ batiment.travauxIti }}</td>
            <td>{{ batiment.constructionDebut }}</td>
            <td>{{ batiment.constructionFin }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.TaillesBottes.' + batiment.bottesTaille)">{{ batiment.bottesTaille }}</td>
            <td>{{ batiment.bottesTailleInfos }}</td>
            <td>{{ batiment.bottesDensite }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.Cereale.' + batiment.bottesCereale)">{{ batiment.bottesCereale }}</td>
            <td>{{ batiment.distanceAppro }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.YesNoPartial.' + batiment.autoconstruction)">{{ batiment.autoconstruction }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.YesNoPartial.' + batiment.participatif)">{{ batiment.participatif }}</td>
            <td>{{ batiment.structCompl }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.StructureComplementaire.' + batiment.structComplNature)">
              {{ batiment.structComplNature }}
            </td>
            <td>{{ batiment.structComplInfos }}</td>
            <td>{{ batiment.longMaxSansMurRefend }}</td>
            <td>{{ batiment.noteCalcul }}</td>
            <td>{{ batiment.nbrRangDeBottes }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.IntegBaie.' + batiment.integBaie)">{{ batiment.integBaie }}</td>
            <td>{{ batiment.integBaieInfos }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.SupportAncrage.' + batiment.supportAncrage)">{{ batiment.supportAncrage }}</td>
            <td>{{ batiment.supportAncrageInfos }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.RevetInt.' + batiment.revetInt)">{{ batiment.revetInt }}</td>
            <td>{{ batiment.revetIntInfos }}</td>
            <td v-text="$t('cartoPaillePorteuseApp.RevetExt.' + batiment.revetExt)">{{ batiment.revetExt }}</td>
            <td>{{ batiment.revetExtInfos }}</td>
            <td>{{ batiment.maitreDOuvrage }}</td>
            <td>{{ batiment.maitreDOeuvre }}</td>
            <td>{{ batiment.architecte }}</td>
            <td>{{ batiment.bureauDEtudeStructure }}</td>
            <td>{{ batiment.bureauControl }}</td>
            <td>{{ batiment.entrepriseBottes }}</td>
            <td>{{ batiment.entrepriseCharpente }}</td>
            <td>{{ batiment.entrepriseEnduits }}</td>
            <td>{{ batiment.descriptionProjet }}</td>
            <td>{{ batiment.difficultees }}</td>
            <td>{{ batiment.astuces }}</td>
            <td>{{ batiment.divers }}</td>
            <td>{{ batiment.contactNom }}</td>
            <td>{{ batiment.contactMail }}</td>
            <td>{{ batiment.contactPhone }}</td>
            <td>{{ batiment.codePostal }}</td>
            <td>{{ batiment.profilPublic }}</td>
            <td>{{ batiment.conditionsAcceptees }}</td>
            <td>{{ batiment.createdDate ? $d(Date.parse(batiment.createdDate), 'short') : '' }}</td>
            <td>{{ batiment.lastModifiedDate ? $d(Date.parse(batiment.lastModifiedDate), 'short') : '' }}</td>
            <td>
              {{ batiment.createdBy ? batiment.createdBy.login : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'BatimentView', params: { batimentId: batiment.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'BatimentEdit', params: { batimentId: batiment.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(batiment)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="cartoPaillePorteuseApp.batiment.delete.question" data-cy="batimentDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-batiment-heading" v-text="$t('cartoPaillePorteuseApp.batiment.delete.question', { id: removeId })">
          Are you sure you want to delete this Batiment?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-batiment"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeBatiment()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="batiments && batiments.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./batiment.component.ts"></script>
