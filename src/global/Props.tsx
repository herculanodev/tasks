// Corrigindo o arquivo Props.tsx
export interface AuthContextType {
    taskList: Array<PropCard>;
    onOpen: () => void;
    handleEdit: (task: PropCard) => void;
    handleDelete: (id: number) => void;
    filter:(t:string)=> void
  }
  
  export type PropCard = {
    description: string;
    flag: PropFlags;
    item: number;
    timeLimit: string;
    title: string;
  };
  
  export type PropFlags = "urgente" | "opcional";
  