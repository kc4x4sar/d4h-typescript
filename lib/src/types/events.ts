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