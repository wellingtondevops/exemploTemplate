export class Report {
    companyName: string;
    initialPeriod: string;
    finalPeriod: string;
    peridoOcr: number;
    totalOcr: number;
    periodSignature: number;
    totalSignature: number ;
    totalDepartamentVolumes: number;
    totalDepartamentArchives: number;
    peridoDepartamentVolumes: number;
    peridoDepartamentArchives: number;
    totalDocumentArchives: number;
    totalDocumentPages: number;
    periodDocumentArchives: number;
    periodDocumentPages: number;
    usedSpace: string;
    DEPARTAMENT: DEPARTAMENT[];
    DOCUMENT: DOCUMENT[];
}

class DEPARTAMENT {
    departamentName: string;
    totalVolumes: number;
    periodVolumes: number;
    totalArchives: number;
    periodArchives: number;
    departamentPeridoPages: number;
    departamentTotalPages: number;
}

class DOCUMENT {
    documentName: string;
    totalArchives: number;
    periodArquivos: number;
    totalPageArchive: number;
    periodPageArchive: number;
}
