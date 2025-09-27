import { createContext } from "react";


export const GroupListContext = createContext<(() => Promise<void>) | null>(() => Promise.resolve());