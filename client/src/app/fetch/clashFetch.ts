import { CLASH_URL } from "@/lib/apiEndPoints";

export async function fetchClashs(token: string) {
  const res = await fetch(CLASH_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responce = await res.json();
  if(responce?.data) {
    return responce?.data;
  }

  return [];
}
