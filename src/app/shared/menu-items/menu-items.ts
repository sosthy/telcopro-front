
export interface BadgeItem {
    type: string;
    value: string;
  }

  export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
  }

  export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
  }

