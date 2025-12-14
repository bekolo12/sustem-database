export interface Label {
  name: string;
  hyperlinked: boolean;
  url: string | null;
}

export interface Section {
  id: string;
  name: string;
  labels: Label[];
}

export interface Department {
  id: number;
  name: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'purple';
  description?: string;
  sections: Section[];
}

export interface CompanyData {
  departments: Department[];
}

export type ViewState = 'dashboard' | 'section';

export interface ActiveSectionState {
  deptId: number;
  sectionId: string;
}
