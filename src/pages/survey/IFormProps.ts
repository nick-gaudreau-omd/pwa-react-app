import { LocalForageService } from "../../service/LocalForageService";

export interface IFormProps{
    currentStep: number;
    onChangeRef: (e:any) => void;
    localforageService: LocalForageService;
} 