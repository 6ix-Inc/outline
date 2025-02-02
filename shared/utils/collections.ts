import { NavigationNode } from "~/types";
import naturalSort from "./naturalSort";

type Sort = {
  field: string;
  direction: "asc" | "desc";
};

export const sortNavigationNodes = (
  documents: NavigationNode[],
  sort: Sort,
  sortChildren = true
): NavigationNode[] => {
  // "index" field is manually sorted and is represented by the documentStructure
  // already saved in the database, no further sort is needed
  if (sort.field === "index") {
    return documents;
  }

  const orderedDocs = naturalSort(documents, sort.field, {
    direction: sort.direction,
  });

  return orderedDocs.map((document) => ({
    ...document,
    children: sortChildren
      ? sortNavigationNodes(document.children, sort, sortChildren)
      : document.children,
  }));
};

export const colorPalette = [
  "#373737",
  "#0366d6",
  "#9E5CF7",
  "#FF825C",
  "#FF5C80",
  "#FFBE0B",
  "#42DED1",
  "#00D084",
  "#FF4DFA",
  "#2F362F",
];
