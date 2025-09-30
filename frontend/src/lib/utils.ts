/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type ResumeData } from "@/components/CVs/interfaces/cvInterface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
  
}

export function safeISO(date: string | Date | undefined | null): string {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}


// Compare two string arrays and track added/removed/changed values
// Compare two string arrays and track added/removed/changed values
export function diffArrays(initArr: string[] = [], currentArr: string[] = []) {
  const diffs: Record<number, string | undefined> = {};
  const maxLen = Math.max(initArr.length, currentArr.length);

  for (let i = 0; i < maxLen; i++) {
    const oldVal = initArr[i];
    const newVal = currentArr[i];

    if (oldVal !== newVal) {
      // If newVal is undefined → deleted, else store new value
      diffs[i] = newVal;
    }
  }

  return diffs;
}

// Deep diff for objects, arrays, and primitives
export function TrackChangedFields<T extends Partial<ResumeData>>(initData: T, currentData: T): Partial<T> {
  const changedFields: Partial<T> = {};

  // Check for changed or deleted fields
  for (const key in initData) {
    const k = key as keyof T;

    // Deleted field
    if (!(k in currentData)) {
      changedFields[k] = undefined;
      continue;
    }

    const oldVal = initData[k];
    const newVal = currentData[k];

    // Special case for skills
    if (k === "skills") {
      const skillChanges: any = {};
      const initSkills = oldVal as { soft: string[]; technical: string[] } | undefined;
      const currentSkills = newVal as { soft: string[]; technical: string[] } | undefined;

      const softDiffs = diffArrays(initSkills?.soft, currentSkills?.soft);
      if (Object.keys(softDiffs).length > 0) skillChanges.soft = softDiffs;

      const techDiffs = diffArrays(initSkills?.technical, currentSkills?.technical);
      if (Object.keys(techDiffs).length > 0) skillChanges.technical = techDiffs;

      if (Object.keys(skillChanges).length > 0) changedFields[k] = skillChanges as T[keyof T];
      continue;
    }

    // Arrays
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      const arrChanges: Record<number, any> = {};
      const maxLen = Math.max(oldVal.length, newVal.length);

      for (let i = 0; i < maxLen; i++) {
        const oldItem = oldVal[i];
        const newItem = newVal[i];

        if (i >= newVal.length) {
          arrChanges[i] = undefined; // deleted
        } else if (i >= oldVal.length) {
          arrChanges[i] = newItem; // added
        } else if (typeof oldItem === "object" && oldItem !== null && typeof newItem === "object" && newItem !== null) {
          const nested = TrackChangedFields(oldItem as any, newItem as any);
          if (Object.keys(nested).length > 0) arrChanges[i] = nested;
        } else if (oldItem !== newItem) {
          arrChanges[i] = newItem;
        }
      }

      if (Object.keys(arrChanges).length > 0) changedFields[k] = arrChanges as T[keyof T];
      continue;
    }

    // Nested objects
    if (oldVal && typeof oldVal === "object" && oldVal !== null && newVal && typeof newVal === "object" && newVal !== null) {
      const nested = TrackChangedFields(oldVal as any, newVal as any);
      if (Object.keys(nested).length > 0) changedFields[k] = nested as T[keyof T];
      continue;
    }

    // Primitive change
    if (oldVal !== newVal) {
      changedFields[k] = newVal;
    }
  }

  // Detect newly added fields
  for (const key in currentData) {
    if (!(key in initData)) {
      changedFields[key as keyof T] = currentData[key as keyof T];
    }
  }

  return changedFields;
}
