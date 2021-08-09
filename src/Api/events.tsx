import axios from 'axios';
import { GetEventData } from '../types';

export async function readAllEvents(): Promise<GetEventData[]> {
  return axios
    .get<GetEventData[]>('/api/events')
    .then((r) => r.data)
    .catch(() => []);
}

export async function readEventById(id: number): Promise<GetEventData | null> {
  return axios
    .get<GetEventData>(`/api/events/${id}`)
    .then((r) => r.data)
    .catch(() => null);
}
