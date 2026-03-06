import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getCurrentPublicationId(userid: string) {
  try {
    const publication = JSON.parse(localStorage.getItem(`publication-${userid}`))
    console.log(publication, "pub id")
    return publication.id
  } catch (error) {
    console.error("Error fetching publication ID", error)
  }
}