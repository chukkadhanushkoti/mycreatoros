import {authedRequest} from "./social-api";
import type {BioStoreDoc} from "./biostore-api";
import type {BioStoreTheme} from "@/config/biostore-themes";
export type Access = {plan:string;credits:number;limits:{bioBlocks:number|null;features:Record<string,boolean>;themeAccess?:Record<string,Record<string,boolean>>};catalog:{themes:{biostore:BioStoreTheme[]}}};
export const getAccess = (token:string):Promise<Access> => authedRequest("/api/access/me",token,{cache:"no-store"});
export const changeUsername = (token:string,username:string) => authedRequest<BioStoreDoc>("/api/biostore/me/username",token,{method:"PATCH",body:JSON.stringify({username})});
