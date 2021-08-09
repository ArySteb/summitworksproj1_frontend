export type GetUserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string | null;
  role: Role;
};

export type PostUserData = Omit<GetUserData, 'id'>;

export type GetSessionData = Omit<PostUserData, 'password'>;

export type Role = 'USER' | 'ADMIN';

type NgoTime = {
  hour: number;
  minute: number;
  nano: number;
  second: number;
};

type NgoCategory = 'conference' | 'seminar' | 'presentation';

export type GetEventData = {
  adult_price: number;
  allow_reg: boolean;
  category: NgoCategory;
  child_price: number;
  desc: string;
  end_date: string;
  end_time: string;
  id: number;
  img_url: string;
  location: string;
  name: string;
  start_date: string;
  start_time: string;
};

export type PostEventData = Omit<
  GetEventData,
  'id' | 'start_time' | 'end_time'
> & {
  start_time: string;
  end_time: string;
};
