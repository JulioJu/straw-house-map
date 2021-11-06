/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/shared/date/filters';
import BatimentsService from '@/entities/batiments/batiments.service';
import { Batiments } from '@/shared/model/batiments.model';
import { UsageBatiment } from '@/shared/model/enumerations/usage-batiment.model';
import { TaillesBottes } from '@/shared/model/enumerations/tailles-bottes.model';
import { Cereale } from '@/shared/model/enumerations/cereale.model';
import { YesNoPartial } from '@/shared/model/enumerations/yes-no-partial.model';
import { StructureSupplementaire } from '@/shared/model/enumerations/structure-supplementaire.model';
import { IntegBaie } from '@/shared/model/enumerations/integ-baie.model';
import { SupportAncrage } from '@/shared/model/enumerations/support-ancrage.model';
import { RevetInt } from '@/shared/model/enumerations/revet-int.model';
import { RevetExt } from '@/shared/model/enumerations/revet-ext.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('Batiments Service', () => {
    let service: BatimentsService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new BatimentsService();
      currentDate = new Date();
      elemDefault = new Batiments(
        123,
        0,
        0,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        UsageBatiment.LOGEMENT_COLLECTIF,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        false,
        currentDate,
        currentDate,
        TaillesBottes.T_70_X_120_X_230_CM,
        'AAAAAAA',
        0,
        Cereale.BLE,
        0,
        YesNoPartial.OUI,
        YesNoPartial.OUI,
        false,
        StructureSupplementaire.BOIS,
        false,
        0,
        0,
        IntegBaie.PRE_CADRE_FLOTTANT,
        SupportAncrage.BOIS,
        'AAAAAAA',
        RevetInt.PLAQUE_DE_PLATRE,
        RevetExt.BARDAGE_VENTILE,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            constructionDebut: dayjs(currentDate).format(DATE_FORMAT),
            constructionFin: dayjs(currentDate).format(DATE_FORMAT),
            dateCreationFiche: dayjs(currentDate).format(DATE_FORMAT),
            dateModificationFiche: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Batiments', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            constructionDebut: dayjs(currentDate).format(DATE_FORMAT),
            constructionFin: dayjs(currentDate).format(DATE_FORMAT),
            dateCreationFiche: dayjs(currentDate).format(DATE_FORMAT),
            dateModificationFiche: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            constructionDebut: currentDate,
            constructionFin: currentDate,
            dateCreationFiche: currentDate,
            dateModificationFiche: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Batiments', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Batiments', async () => {
        const returnedFromService = Object.assign(
          {
            latitude: 1,
            longitude: 1,
            nomBatiment: 'BBBBBB',
            photoPrincipale: 'BBBBBB',
            photoPrincipaleLegende: 'BBBBBB',
            photoPrincipaleDescription: 'BBBBBB',
            photo1: 'BBBBBB',
            photo1Legende: 'BBBBBB',
            photo1Description: 'BBBBBB',
            photo2: 'BBBBBB',
            photo2Legende: 'BBBBBB',
            photo2Description: 'BBBBBB',
            photo3: 'BBBBBB',
            photo3Legende: 'BBBBBB',
            photo3Description: 'BBBBBB',
            photo4: 'BBBBBB',
            photo4Legende: 'BBBBBB',
            photo4Description: 'BBBBBB',
            photo5: 'BBBBBB',
            photo5Legende: 'BBBBBB',
            photo5Description: 'BBBBBB',
            techniqueSecondaire: true,
            usageBatiment: 'BBBBBB',
            cout: 1,
            surfacePlancher: 1,
            niveaux: 1,
            travauxNeuf: true,
            travauxExtension: true,
            travauxRenov: true,
            travauxIte: true,
            travauxIti: true,
            constructionDebut: dayjs(currentDate).format(DATE_FORMAT),
            constructionFin: dayjs(currentDate).format(DATE_FORMAT),
            bottesTaille: 'BBBBBB',
            botteTailleAutre: 'BBBBBB',
            bottesDensite: 1,
            bottesCereale: 'BBBBBB',
            distanceAppro: 1,
            autoconstruction: 'BBBBBB',
            participatif: 'BBBBBB',
            structSuppl: true,
            structSupplNature: 'BBBBBB',
            noteCalcul: true,
            nbrRangDeBottes: 1,
            longMaxSansMurRefend: 1,
            integBaie: 'BBBBBB',
            supportAncrage: 'BBBBBB',
            supportAncragePrecisions: 'BBBBBB',
            revetInt: 'BBBBBB',
            revetExt: 'BBBBBB',
            revetExtAutre: 'BBBBBB',
            maitreDOuvrage: 'BBBBBB',
            maitreDOeuvre: 'BBBBBB',
            architecte: 'BBBBBB',
            bureauDEtudeStructure: 'BBBBBB',
            bureauControl: 'BBBBBB',
            entrepriseBottes: 'BBBBBB',
            entrepriseCharpente: 'BBBBBB',
            entrepriseEnduits: 'BBBBBB',
            descriptionProjet: 'BBBBBB',
            difficultees: 'BBBBBB',
            astuces: 'BBBBBB',
            divers: 'BBBBBB',
            contactNom: 'BBBBBB',
            contactMail: 'BBBBBB',
            contactPhone: 'BBBBBB',
            codePostal: 'BBBBBB',
            nonBatimentEtPhotosPublics: true,
            dateCreationFiche: dayjs(currentDate).format(DATE_FORMAT),
            dateModificationFiche: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            constructionDebut: currentDate,
            constructionFin: currentDate,
            dateCreationFiche: currentDate,
            dateModificationFiche: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Batiments', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Batiments', async () => {
        const patchObject = Object.assign(
          {
            latitude: 1,
            longitude: 1,
            photoPrincipale: 'BBBBBB',
            photo1: 'BBBBBB',
            photo1Legende: 'BBBBBB',
            photo1Description: 'BBBBBB',
            photo2Description: 'BBBBBB',
            photo3: 'BBBBBB',
            photo3Description: 'BBBBBB',
            photo5: 'BBBBBB',
            photo5Description: 'BBBBBB',
            usageBatiment: 'BBBBBB',
            travauxExtension: true,
            travauxIti: true,
            constructionDebut: dayjs(currentDate).format(DATE_FORMAT),
            bottesTaille: 'BBBBBB',
            botteTailleAutre: 'BBBBBB',
            bottesDensite: 1,
            distanceAppro: 1,
            structSuppl: true,
            structSupplNature: 'BBBBBB',
            noteCalcul: true,
            longMaxSansMurRefend: 1,
            supportAncragePrecisions: 'BBBBBB',
            revetInt: 'BBBBBB',
            revetExtAutre: 'BBBBBB',
            maitreDOuvrage: 'BBBBBB',
            maitreDOeuvre: 'BBBBBB',
            bureauDEtudeStructure: 'BBBBBB',
            bureauControl: 'BBBBBB',
            entrepriseBottes: 'BBBBBB',
            entrepriseEnduits: 'BBBBBB',
            descriptionProjet: 'BBBBBB',
            contactNom: 'BBBBBB',
            contactMail: 'BBBBBB',
            contactPhone: 'BBBBBB',
            codePostal: 'BBBBBB',
            dateModificationFiche: dayjs(currentDate).format(DATE_FORMAT),
          },
          new Batiments()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            constructionDebut: currentDate,
            constructionFin: currentDate,
            dateCreationFiche: currentDate,
            dateModificationFiche: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Batiments', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Batiments', async () => {
        const returnedFromService = Object.assign(
          {
            latitude: 1,
            longitude: 1,
            nomBatiment: 'BBBBBB',
            photoPrincipale: 'BBBBBB',
            photoPrincipaleLegende: 'BBBBBB',
            photoPrincipaleDescription: 'BBBBBB',
            photo1: 'BBBBBB',
            photo1Legende: 'BBBBBB',
            photo1Description: 'BBBBBB',
            photo2: 'BBBBBB',
            photo2Legende: 'BBBBBB',
            photo2Description: 'BBBBBB',
            photo3: 'BBBBBB',
            photo3Legende: 'BBBBBB',
            photo3Description: 'BBBBBB',
            photo4: 'BBBBBB',
            photo4Legende: 'BBBBBB',
            photo4Description: 'BBBBBB',
            photo5: 'BBBBBB',
            photo5Legende: 'BBBBBB',
            photo5Description: 'BBBBBB',
            techniqueSecondaire: true,
            usageBatiment: 'BBBBBB',
            cout: 1,
            surfacePlancher: 1,
            niveaux: 1,
            travauxNeuf: true,
            travauxExtension: true,
            travauxRenov: true,
            travauxIte: true,
            travauxIti: true,
            constructionDebut: dayjs(currentDate).format(DATE_FORMAT),
            constructionFin: dayjs(currentDate).format(DATE_FORMAT),
            bottesTaille: 'BBBBBB',
            botteTailleAutre: 'BBBBBB',
            bottesDensite: 1,
            bottesCereale: 'BBBBBB',
            distanceAppro: 1,
            autoconstruction: 'BBBBBB',
            participatif: 'BBBBBB',
            structSuppl: true,
            structSupplNature: 'BBBBBB',
            noteCalcul: true,
            nbrRangDeBottes: 1,
            longMaxSansMurRefend: 1,
            integBaie: 'BBBBBB',
            supportAncrage: 'BBBBBB',
            supportAncragePrecisions: 'BBBBBB',
            revetInt: 'BBBBBB',
            revetExt: 'BBBBBB',
            revetExtAutre: 'BBBBBB',
            maitreDOuvrage: 'BBBBBB',
            maitreDOeuvre: 'BBBBBB',
            architecte: 'BBBBBB',
            bureauDEtudeStructure: 'BBBBBB',
            bureauControl: 'BBBBBB',
            entrepriseBottes: 'BBBBBB',
            entrepriseCharpente: 'BBBBBB',
            entrepriseEnduits: 'BBBBBB',
            descriptionProjet: 'BBBBBB',
            difficultees: 'BBBBBB',
            astuces: 'BBBBBB',
            divers: 'BBBBBB',
            contactNom: 'BBBBBB',
            contactMail: 'BBBBBB',
            contactPhone: 'BBBBBB',
            codePostal: 'BBBBBB',
            nonBatimentEtPhotosPublics: true,
            dateCreationFiche: dayjs(currentDate).format(DATE_FORMAT),
            dateModificationFiche: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            constructionDebut: currentDate,
            constructionFin: currentDate,
            dateCreationFiche: currentDate,
            dateModificationFiche: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Batiments', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Batiments', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Batiments', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
