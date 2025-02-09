export interface ServiceForm {
     id: number
     
    name: string;
    phoneNumber: string;
    email: string;
    serviceName: string;
    requirement: string;
    fileName: string
    files: File | FileList | FormData | null
    fileContent: string
    date:Date
    status:string
    emailAdmin:string
    notification:string
    rejection:string
  }