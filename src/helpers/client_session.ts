'use client'

import { useEffect, useState } from "react";

export function setUser(id: number) {
  sessionStorage.setItem('user_id', id.toString());
}

export function getUser() {
  return sessionStorage.getItem('user_id');
}

export function unsetUser() {
  sessionStorage.removeItem('user_id');
}

export const useUserData = (key: string) => {
  const [ value, setValue ] = useState<string | null>(null);

  useEffect(() => {
    setValue(sessionStorage.getItem(key));
  }, [ key ])

  return value;
}