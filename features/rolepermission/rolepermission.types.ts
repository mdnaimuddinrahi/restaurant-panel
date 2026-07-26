export interface RoleFilterPanelProps {
  searchFields: string[];
  onSearch: () => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void,
}

export interface RoleTableHead {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}