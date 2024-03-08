export interface Incident {
  id: number,
  ref_desc: string,
  date: string,
  enddate?: string,
  description?: string,
  lat?: number,
  lng?: number,
  tags?: string[],
}

export interface IncidentRoster {
  id: number,
  status: string,
  date: string,
  enddate: string,
  role: {
    id: number,
    title: string,
    bundle: string,
  },
  member: { id: number, name: string }
}